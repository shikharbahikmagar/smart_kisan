import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateFarmerShopDto } from './dto/create-farmer-shop.dto';
import { UpdateFarmerShopDto } from './dto/update-farmer-shop.dto';
import { FarmerShop } from './entities/farmer-shop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FarmerShopService {

  constructor(

    @InjectRepository(FarmerShop)
    private farmerShopRepository: Repository<FarmerShop>
  ) { }


  async create(data: CreateFarmerShopDto, userId: number): Promise<FarmerShop> {

    // console.log(`ID IS ${userId}`);

    try {

      //console.log(`Creating farmer shop with data: ${JSON.stringify(data)}`);
      

      if (data.shopEmail) {
        const existingFarmerShop = await this.farmerShopRepository.findOne({
          where: {
            shopEmail: data.shopEmail
          }
        })

        if (existingFarmerShop) {

          throw new HttpException({
            status: HttpStatus.BAD_REQUEST,
            message: 'Farmer shop email already exist!',
            error: 'Bad Request',
          },
            HttpStatus.BAD_REQUEST,
          );


        }

      }

      const newFarmerShop = this.farmerShopRepository.create({

        shopName: data.shopName,
        shopAddress: data.shopAddress,
        province: data.province,
        city: data.city,
        street: data.street,
        shopEmail: data.shopEmail,
        shopDescription: data.shopDescription,
        shopImage: data.shopImage,
        citizenshipFrontImage: data.citizenshipFrontImage,
        citizenshipBackImage: data.citizenshipBackImage,
        panNumber: data.panNumber,
        contactNumber: data.contactNumber,
        user: { id: userId }

      });

      const farmerShop = await this.farmerShopRepository.save(newFarmerShop);

      return farmerShop;

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


  async verifyShop(id: string): Promise<FarmerShop>{

    const farmerShop = await this.farmerShopRepository.findOne({
      where: {
        id: Number(id)
      }
    });

    if(!farmerShop){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        message: 'Farmer shop not found',
        error: 'Not Found',
      }, HttpStatus.NOT_FOUND);
    }

    farmerShop.isVerified = true;
    const updatedFarmerShop = await this.farmerShopRepository.save(farmerShop); 

    return updatedFarmerShop;

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
