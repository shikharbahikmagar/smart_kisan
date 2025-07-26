import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from '../../common/decorators/user.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { authPayload } from '../auth/jwt.strategy';

//controller for user module
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  //user register
  @IsPublic()
  @Post('signup')
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatartUrl = file
      ? await this.cloudinaryService.uploadUserAvatar(file)
      : '';

    const user = await this.userService.create({
      ...createUserDto,
      avatar: avatartUrl,
    });

    return {
      message: 'User created successfully',
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    };
  }

  //register experts only by admin
  @Roles(UserRole.ADMIN)
  @UseGuards(RolesGuard)
  @Post('register-expert')
  @UseInterceptors(FileInterceptor('avatar'))
  async registerExpert(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const avatartUrl = file
      ? await this.cloudinaryService.uploadUserAvatar(file)
      : '';

    const user = await this.userService.create({
      ...createUserDto,
      avatar: avatartUrl,
    });

    return {
      message: 'Expert created successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    };
  }

  //user login
  @IsPublic()
  @Post('login')
  async login(@Body() data: LoginUserDto) {
    const { user, accessToken, refreshToken } =
      await this.userService.login(data);

    // console.log(user);

    return {
      message: 'User logged in successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  //user profile get
  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER, UserRole.EXPERT, UserRole.ADMIN, UserRole.USER)
  @Get('profile')
  async getProfile(@User() user: authPayload) {
    const userDetails = await this.userService.getProfile(user.userId);

    // console.log(userDetails);

    return {
      message: 'User profile retrieved successfully',
      data: {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        contactNumber: userDetails.contactNumber,
        email: userDetails.email,
        role: userDetails.role,
        avatar: userDetails.avatar,
        isVerified: userDetails.isVerified,
        isAdmin: userDetails.isAdmin,
      },
    };
  }

  //get all experts
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('experts')
  async getAllExperts() {
    const experts = await this.userService.getAllExperts();

    return {
      message: 'Experts retrieved successfully',
      data: experts.map((expert) => ({
        id: expert.user.id,
        firstName: expert.user.firstName,
        lastName: expert.user.lastName,
        contactNumber: expert.user.contactNumber,
        email: expert.user.email,
        avatar: expert.user.avatar,
        expertise: expert.expertise,
        qualification: expert.qualification,
        experience_years: expert.experience_years,
        availability: expert.availability,
        bio: expert.bio,
        isVerified: expert.user.isVerified,
      })),
    };
  }

  //get expert details by id
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get('expert/:id')
  async getExpertById(@Param('id') id: string) {
    const user = await this.userService.getExpertById(+id);

    return {
      message: 'Expert retrieved successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        avatar: user.avatar,
        expertise: user.expertProfile.expertise,
        qualification: user.expertProfile.qualification,
        experience_years: user.expertProfile.experience_years,
        availability: user.expertProfile.availability,
        bio: user.expertProfile.bio,
        isVerified: user.isVerified,
      },
    };
  }

  //send email verification code

  @Get('send-email-verification')
  async sendEmailVerification(@User() user: authPayload) {
    // console.log('afjlsdflka', user);

    const userDetails = await this.userService.sendEmailVerificationCode(
      user.userId,
    );

    return {
      message: 'Email verification code sent successfully',
      data: {
        id: userDetails.id,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        contactNumber: userDetails.contactNumber,
        email: userDetails.email,
        email_verified_at: userDetails.email_verified_at,
        email_verification_token: userDetails.email_verification_token,
        email_verification_token_expires_at:
          userDetails.email_verification_token_expires_at,
        avatar: userDetails.avatar,
        isVerified: userDetails.isVerified,
        isAdmin: userDetails.isAdmin,
      },
    };
  }

  //verify email
  @Post('verify-email')
  async verifyEmail(@Body() token: string, @User() user: authPayload) {
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
        email_verification_token_expires_at:
          userDetails.email_verification_token_expires_at,
        avatar: userDetails.avatar,
        isVerified: userDetails.isVerified,
        isAdmin: userDetails.isAdmin,
      },
    };
  }

  //user forgot password
  @IsPublic()
  @Post('forgot-password')
  async forgotPassword(@Body() data: { email: string }) {
    await this.userService.forgotPassword(data.email);

    return {
      message: 'Password reset Token sent to your email',
      data: {
        email: data.email,
      },
    };
  }

  //reset user password
  @IsPublic()
  @Post('reset-password')
  async resetPassword(
    @Body()
    data: {
      token: string;
      new_password: string;
      confirm_password: string;
    },
  ) {
    if (data.new_password !== data.confirm_password) {
      throw new HttpException(
        'Password and confirm password do not match',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.resetPassword(data);

    return {
      message: 'Password reset successfully',
      data: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        contactNumber: user.contactNumber,
        email: user.email,
        avatar: user.avatar,
        isVerified: user.isVerified,
        isAdmin: user.isAdmin,
      },
    };
  }

 

}
