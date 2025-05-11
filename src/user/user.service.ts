import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    try {
      
      const { firstName, lastName, contactNumber, email, password, avatar, isVerified, isAdmin } = createUserDto;
      const user = {
        firstName,
        lastName,
        contactNumber,
        email,
        password,
        avatar,
        isVerified,
        isAdmin
      }
      
      console.log(user);
      

    } catch (error) {
      
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
