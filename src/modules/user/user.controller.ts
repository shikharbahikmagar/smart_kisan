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
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { User} from '../../common/decorators/user.decorator';

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

}
