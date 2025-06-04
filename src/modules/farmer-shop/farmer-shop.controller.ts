import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, UseFilters } from '@nestjs/common';
import { FarmerShopService } from './farmer-shop.service';
import { CreateFarmerShopDto } from './dto/create-farmer-shop.dto';
import { UpdateFarmerShopDto } from './dto/update-farmer-shop.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../../common/decorators/user.decorator';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor, FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterExceptionFilter } from 'src/filters/multer-exception.filter';


@Controller('farmer-shop')
export class FarmerShopController {
  constructor(
    private readonly farmerShopService: FarmerShopService,
    private readonly cloudinaryService: CloudinaryService,
  )
  
  {}


  @UseGuards(JwtAuthGuard)
  @UseFilters(MulterExceptionFilter) 
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'shopImage', maxCount: 1},
    {name: 'citizenshipFrontImage', maxCount: 1},
    {name: 'citizenshipBackImage', maxCount: 1},
  ],
  {
    limits: {
      fileSize: 5 * 1024 * 1024, // 5 MB
    },
    fileFilter: (req, file, cb) => {
      // Only allow image mimetypes
      if (!file.mimetype.match(/^image\/(jpeg|png|jpg|webp)$/)) {
        return cb(new Error('Only image files (jpg, jpeg, png, webp) are allowed!'), false);
      }
      cb(null, true);
    },
  }))

  @Post('create')
  async create(@Body() createFarmerShopDto: CreateFarmerShopDto, @User() user: any, @UploadedFiles() files: {

    shopImage?: Express.Multer.File[],
    citizenshipFrontImage?: Express.Multer.File[],
    citizenshipBackImage?: Express.Multer.File[],
  }) {
    

    const shopImageUrl = files.shopImage && files.shopImage.length > 0 ? await this.cloudinaryService.uploadFarmerShopImage(files.shopImage[0]) : '';

    const citizenshipFrontImageUrl = files.citizenshipFrontImage && files.citizenshipFrontImage.length > 0 ? await this.cloudinaryService.uploadFarmerCitizenshipFrontImage(files.citizenshipFrontImage[0]) : '';

    const citizenshipBackImageUrl = files.citizenshipBackImage && files.citizenshipBackImage.length > 0 ? await this.cloudinaryService.uploadFarmerCitizenshipBackImage(files.citizenshipBackImage[0]) : '';
    
    const farmerShop = await this.farmerShopService.create({...createFarmerShopDto,

      shopImage: shopImageUrl,
      citizenshipFrontImage: citizenshipFrontImageUrl,
      citizenshipBackImage: citizenshipBackImageUrl,
     }, user.userId);

    return {
      message: 'Farmer shop created successfully',
      farmerShop: {
        id: farmerShop.id,
        shopName: farmerShop.shopName,
        shopAddress: farmerShop.shopAddress,
        province: farmerShop.province,
        city: farmerShop.city,
        street: farmerShop.street,
        shopEmail: farmerShop.shopEmail,
        shopDescription: farmerShop.shopDescription,
        shopImage: farmerShop.shopImage,
        citizenshipFrontImage: farmerShop.citizenshipFrontImage,
        citizenshipBackImage: farmerShop.citizenshipBackImage,
        panNumber: farmerShop.panNumber,
        contactNumber: farmerShop.contactNumber,
      }
    }
    
  }

  @Get('verify/:id')
  async verifyShop(@Param('id') id: string){

      const farmerShopp = await this.farmerShopService.verifyShop(id);

      return {
        message: 'Farmer shop verified successfully',
        farmerShop: {
          id: farmerShopp.id,
          shopName: farmerShopp.shopName,
          shopAddress: farmerShopp.shopAddress,
          province: farmerShopp.province,
          city: farmerShopp.city,
          street: farmerShopp.street,
          shopEmail: farmerShopp.shopEmail,
          shopDescription: farmerShopp.shopDescription,
          shopImage: farmerShopp.shopImage,
          citizenshipFrontImage: farmerShopp.citizenshipFrontImage,
          citizenshipBackImage: farmerShopp.citizenshipBackImage,
          panNumber: farmerShopp.panNumber,
          contactNumber: farmerShopp.contactNumber,
        }
      }

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
