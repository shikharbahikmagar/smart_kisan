import { Controller, Get, Post, Body, Patch, Param, Delete, UseFilters } from '@nestjs/common';
import { ExpertService } from './expert.service';
import { CreateExpertDto } from './dto/create-expert.dto';
import { UpdateExpertDto } from './dto/update-expert.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { User } from '../../common/decorators/user.decorator';
import { authPayload } from '../auth/jwt.strategy';


@Controller('expert')
export class ExpertController {
  constructor(

      private readonly expertService: ExpertService,
    ) {}


  // register expert through admin panel
  @UseGuards(RolesGuard)
  @Roles(UserRole.EXPERT)
  @Post('update-profile')
  async updateProfile(@Body() data: UpdateExpertDto, @User () user: authPayload) {

  console.log("Raw data:", user);

  const newExpert = await this.expertService.updateProfile(data, user.userId);
    
  return {
    message: 'Expert registered successfully',
    data: {
      expertise: newExpert.expertise,
      qualification: newExpert.qualification,
      experiece_years: newExpert.experience_years,
      availability: newExpert.availability,
      bio: newExpert.bio,
    },
  }
  }

  @Get()
  findAll() {
    return this.expertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpertDto: UpdateExpertDto) {
    return this.expertService.update(+id, updateExpertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expertService.remove(+id);
  }
}
