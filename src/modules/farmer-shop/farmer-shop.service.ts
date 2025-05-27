import { Injectable } from '@nestjs/common';
import { CreateFarmerShopDto } from './dto/create-farmer-shop.dto';
import { UpdateFarmerShopDto } from './dto/update-farmer-shop.dto';

@Injectable()
export class FarmerShopService {
  create(createFarmerShopDto: CreateFarmerShopDto) {
    return 'This action adds a new farmerShop';
  }

  findAll() {
    return `This action returns all farmerShop`;
  }

  findOne(id: number) {
    return `This action returns a #${id} farmerShop`;
  }

  update(id: number, updateFarmerShopDto: UpdateFarmerShopDto) {
    return `This action updates a #${id} farmerShop`;
  }

  remove(id: number) {
    return `This action removes a #${id} farmerShop`;
  }
}
