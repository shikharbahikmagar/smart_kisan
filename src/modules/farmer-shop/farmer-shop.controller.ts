import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmerShopService } from './farmer-shop.service';
import { CreateFarmerShopDto } from './dto/create-farmer-shop.dto';
import { UpdateFarmerShopDto } from './dto/update-farmer-shop.dto';

@Controller('farmer-shop')
export class FarmerShopController {
  constructor(private readonly farmerShopService: FarmerShopService) {}

  @Post()
  create(@Body() createFarmerShopDto: CreateFarmerShopDto) {
    return this.farmerShopService.create(createFarmerShopDto);
  }

  @Get()
  findAll() {
    return this.farmerShopService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerShopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmerShopDto: UpdateFarmerShopDto) {
    return this.farmerShopService.update(+id, updateFarmerShopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerShopService.remove(+id);
  }
}
