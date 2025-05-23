import { 
          Controller, 
          Get, 
          Post, 
          Body, 
          Patch, 
          Param, 
          Delete, 
          UseInterceptors, 
          UploadedFile, 
          UseGuards,
          HttpException,
          HttpStatus
   } from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailVerifyDto } from './dto/email-verify.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { User} from '../../common/decorators/user.decorator';

//controller for user module
@Controller('user')
export class UserController {
  constructor
  (
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,

  ) {}

  //user register
  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  async create(@Body() createUserDto: CreateUserDto, @UploadedFile() file: Express.Multer.File) {

    const avatartUrl  =  file ? await this.cloudinaryService.uploadUserAvatar(file) : '';


    const user = await this.userService.create({...createUserDto, avatar: avatartUrl});

    return {
      message: 'User created successfully',
      user: {

        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      }
    }
  }

  //user login 
  @Post('login')
  async login(@Body() data: LoginUserDto)
  {

      const {user, accessToken, refreshToken} = await this.userService.login(data);

  

      return {
        message: 'User logged in successfully',
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          contactNumber: user.contactNumber,
          email: user.email,
          avatar: user.avatar,
          isVerified: user.isVerified,
          isAdmin: user.isAdmin,
        },
        accessToken: accessToken,
        refreshToken: refreshToken,
      }
  }

  //user profile get
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@User() user: any) {

    const userDetails = await this.userService.getProfile(user.userId);

    return {
      message: 'User profile retrieved successfully',
      user: {
        id: userDetails.id,         
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        contactNumber: userDetails.contactNumber,
        email: userDetails.email,
        avatar: userDetails.avatar,
        isVerified: userDetails.isVerified,
        isAdmin: userDetails.isAdmin,
      }
    }


      
  }

  //send email verification code
  @UseGuards(JwtAuthGuard)
  @Get('send-email-verification') 
  async sendEmailVerification(@User() user:any){

    const userDetails = await this.userService.sendEmailVerificationCode(user.userId);

    return {
      message: 'Email verification code sent successfully',
      user: {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        contactNumber: userDetails.contactNumber,
        email: userDetails.email,
        email_verified_at: userDetails.email_verified_at,
        email_verification_token: userDetails.email_verification_token,
        email_verification_token_expires_at: userDetails.email_verification_token_expires_at,
          avatar: userDetails.avatar,
          isVerified: userDetails.isVerified,
        isAdmin: userDetails.isAdmin,
      }
    } 

  }

  //verify email
  @UseGuards(JwtAuthGuard)
  @Post('verify-email')
  async verifyEmail(@Body() token: string, @User() user:any){

    const userDetails = await this.userService.verifyEmail(token, user.userId);

    return {
      message: 'User email verified successfully',
      user: {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        contactNumber: userDetails.contactNumber,
        email: userDetails.email,
        email_verified_at: userDetails.email_verified_at,
        email_verification_token: userDetails.email_verification_token,
        email_verification_token_expires_at: userDetails.email_verification_token_expires_at,
          avatar: userDetails.avatar,
          isVerified: userDetails.isVerified,
        isAdmin: userDetails.isAdmin,
      }
    }

  }

  //user forgot password
  @Post('forgot-password')
  async forgotPassword(@Body() data: {email: string}) {

    await this.userService.forgotPassword(data.email);

    return {
      message: 'Password reset Token sent to your email',
      data: {
        email: data.email,
      }
    }
  }

  //reset user password
  @Post('reset-password')
  async resetPassword(@Body() data: {token: string, new_password: string, confirm_password: string}){

    if(data.new_password !== data.confirm_password) {

      throw new HttpException('Password and confirm password do not match', HttpStatus.BAD_REQUEST);
    }

    const user = await this.userService.resetPassword(data)

    return {
      message: 'Password reset successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      }
    }

  }

}
