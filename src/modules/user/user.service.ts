    import {
    Injectable,
    HttpException,
    HttpStatus
    } from '@nestjs/common';
    import {
    CreateUserDto
    } from './dto/create-user.dto';
    import {
    LoginUserDto
    } from './dto/login-user.dto';
    import {
    UpdateUserDto
    } from './dto/update-user.dto';
    import {
    InjectRepository
    } from '@nestjs/typeorm';
    import {
    User
    } from './entities/user.entity';
    import {
    Repository
    } from 'typeorm';
    import * as bcrypt from 'bcrypt';
    import {
    JwtService
    } from '@nestjs/jwt';

    import {Str} from '../../common/helpers/str.helper'
    import { MailService } from 'src/mail/mail.service';

    @Injectable()
    export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository < User > ,
        private jwtService: JwtService,
        private readonly mailService: MailService,
    ) {}

    // Create a new user
    async create(data: CreateUserDto) {
        try {

            // Check if the user already exists
            const existingUser = await this.userRepository.findOne({
                where: {
                    email: data.email
                },
            })

            // If the user already exists, throw an error
            if (existingUser) {

                throw new HttpException({ 
                        status: HttpStatus.BAD_REQUEST,
                        message: 'Email already exists try different email!',
                        error: 'Bad Request',
                    },
                    HttpStatus.BAD_REQUEST,
                );
            }

            // upload the file to cloudinary


            const hashPassword = await bcrypt.hash(data.password, 10);

            const user = this.userRepository.create({

                firstName: data.firstName,
                lastName: data.lastName,
                contactNumber: data.contactNumber,
                email: data.email,
                password: hashPassword,
                avatar: data.avatar,
                isVerified: data.isVerified,
                isAdmin: data.isAdmin,

            });

            const result = await this.userRepository.save(user);

            return result;
            // Save user to the database (this is just a simulation)
            // For example: await this.userRepository.save(user);

            //console.log(user);

        } catch (error) {
            console.error('Error creating user:', error);

            // Re-throw HttpExceptions so Nest can handle them properly
            if (error instanceof HttpException) {
                throw error;
            }

            // Otherwise, throw a generic internal server error
            throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


  //user login
  async login(data: LoginUserDto): Promise < any > {
      try {

          const user = await this.userRepository.findOne({
              where: {
                  email: data.email
              }
          });

          if (!user) {
              throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
          }

          const isPasswordValid = await bcrypt.compare(data.password, user.password);
          if (!isPasswordValid) {
              throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
          }

          const accessToken = this.generateAccessToken(user);
          const refreshToken = this.generateRefreshToken(user); // Implement refresh token generation here

          return {
              user,
              accessToken,
              refreshToken, // Return refresh token as well
          }

      } catch (error) {

          console.error('Error logging in user:', error);

          // Re-throw HttpExceptions so Nest can handle them properly
          if (error instanceof HttpException) {
              throw error;
          }

          // Otherwise, throw a generic internal server error
          throw new HttpException('Failed to login user', HttpStatus.INTERNAL_SERVER_ERROR);

      }
  }


  //user profile get
  async getProfile(userId: number): Promise <User>{

    try {
            
        // Find the user by ID
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }, 
            select: {
                id: true,
                firstName: true,
                lastName: true,
                contactNumber: true,
                email: true,
                avatar: true,
                isVerified: true,
                isAdmin: true
            }
        })

        if (!user) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  message: 'User not found',
                  error: 'Bad Request',
                },
                HttpStatus.BAD_REQUEST,
              );
        }

        return user;
        
    

    } catch (error) {
        
        console.error('Error getting user profile:', error);

        // Re-throw HttpExceptions so Nest can handle them properly
        if (error instanceof HttpException) {
            throw error;
        }

        // Otherwise, throw a generic internal server error
        throw new HttpException('Failed to get user profile', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  //send user email verification code
  async sendEmailVerificationCode(userId: number): Promise < User > {

    try {

            const user = await this.userRepository.findOne({
                where: {
                    id: userId
                }
            })
            
            if(!user)
            {
                throw new HttpException(
                    {
                      status: HttpStatus.BAD_REQUEST,
                      message: 'User not found',
                      error: 'Bad Request',
                    },
                    HttpStatus.BAD_REQUEST,
                  );
            }

            // Check if the user is already verified
            if(user.email_verified_at)
            {
                throw new HttpException(
                    {
                      status: HttpStatus.BAD_REQUEST,
                      message: 'User already verified',
                      error: 'Bad Request',
                    },
                    HttpStatus.BAD_REQUEST,
                  );
            }


            // Generate 6 digit verification code
            const verificationCode= Str.random(6);

            // Set the verification code and its expiration time
            user.email_verification_token = verificationCode;
            user.email_verification_token_expires_at = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes from now

            // Send the verification code to the user's email
            await this.mailService.sendMail(
                user.email,
                'Email Verification Code',
                'email-verification',
                {
                    name: user.firstName,
                    verificationCode: verificationCode,
                },
            )

            // Save the user with the verification code
            const updatedUser = await this.userRepository.save(user);

            return updatedUser;
        
    } catch (error) {

        // Log full error for internal debugging
        console.error('Error sending email verification code:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });
      
        // Re-throw known HttpExceptions
        if (error instanceof HttpException) {
          throw error;
        }
      
        // Optionally, log to an external service like Sentry here
      
        // Return a generic message to avoid leaking internal details
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while sending email verification code. Please try again later.',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
        
    }


  }

  //verify user email
  async verifyEmail(userId: number): Promise < User > {

    try {

        const user = await this.userRepository.findOne({
            where: {
                id: userId
            }
        });

        if(!user)
        {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  message: 'User not found',
                  error: 'Bad Request',
                },
                HttpStatus.BAD_REQUEST,
              );
        }


        // Check if the user is already verified
        if (user.isVerified) {
            throw new HttpException(
                {
                  status: HttpStatus.BAD_REQUEST,
                  message: 'User already verified',
                  error: 'Bad Request',
                },
                HttpStatus.BAD_REQUEST,
              );
        }

        // Verify the user's email
        user.email_verified_at = new Date();

        //save the user
        const updatedUser = await this.userRepository.save(user);

        return updatedUser;

    
        
    } catch (error) {
        // Log full error for internal debugging
        console.error('Error verifying user email:', {
          message: error.message,
          stack: error.stack,
          name: error.name,
        });
      
        // Re-throw known HttpExceptions
        if (error instanceof HttpException) {
          throw error;
        }
      
        // Optionally, log to an external service like Sentry here
      
        // Return a generic message to avoid leaking internal details
        throw new HttpException(
          {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Something went wrong while verifying your email. Please try again later.',
            error: 'Internal Server Error',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      

  }


  generateAccessToken(user: User): string {
    const payload = {
        sub: user.id,
        email: user.email
    };
    return this.jwtService.sign(payload, {
        expiresIn: '15m'
    }); // Short-lived access token
  }

  generateRefreshToken(user: User): string {
    const payload = {
        sub: user.id,
        email: user.email
    };
    return this.jwtService.sign(payload, {
        expiresIn: '7d'
    }); // Long-lived refresh token
  }
}