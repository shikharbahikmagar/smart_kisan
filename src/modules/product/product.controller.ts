import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UploadedFile } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { IsPublic } from 'src/common/decorators/public.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { authPayload } from '../auth/jwt.strategy';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService,
              private readonly cloudinaryService: CloudinaryService

  ) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  async postProduct(@Body() data: CreateProductDto, @UploadedFile() file: Express.Multer.File, @User() user: authPayload) {

    const productImage = file ? await this.cloudinaryService.uploadProductImage(file) : '';

    // console.log('Product Image:', productImage);
    

    const product =  await this.productService.postProduct({...data, image: productImage }, user.userId);

    return {
      message: 'Product created successfully',
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        categoryId: product.categoryId,
        farmerShopId: product.farmerShopId,
      },
    }
  }

  @IsPublic()
  @Get()
  async getAllProducts() {

    const products = await this.productService.getAllProducts();

    return {
      message: 'Products retrieved successfully',
      data: {
        products: products.map((product: Product) => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          categoryId: product.categoryId,
          farmerShopId: product.farmerShopId,
        })),
      },
    }
  }

  @IsPublic()
  @Get(':id')
  async productDetails(@Param('id') id: string) {
    
    const product = await this.productService.productDetails(+id);
    
    return {
      message: 'Product details retrieved successfully',
      data: {
        ...product
      }
    
  }
}

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @UseInterceptors(FileInterceptor('image'))
  @Patch(':id')
  async updateProduct(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateProductDto, @UploadedFile() file: Express.Multer.File) {

   if(file)
   {
    const productImage = await this.cloudinaryService.uploadProductImage(file);

    data.image = productImage;


   }

    const updatedProduct = await this.productService.updateProduct(id, data);

    return {
      message: 'Product updated successfully',
      data: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        discountedPrice: updatedProduct.discountedPrice,
        image: updatedProduct.image,
        categoryId: updatedProduct.categoryId,
        farmerShopId: updatedProduct.farmerShopId,
      },
    };
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @Get('update-status/:id')
  async updateProductStatus(@Param('id', ParseIntPipe) id: number) {
    const updatedProduct = await this.productService.updateProductStatus(id);

    return {
      message: 'Product status updated successfully',
      data: {
        id: updatedProduct.id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        price: updatedProduct.price,
        image: updatedProduct.image,
        categoryId: updatedProduct.categoryId,
        farmerShopId: updatedProduct.farmerShopId,
      },
    };
  }

  @Delete(':id')
  async deletePoduct(@Param('id', ParseIntPipe) id: number) {
    await this.productService.deleteProduct(id);

    return {
      message: 'Product deleted successfully',
    };
  }
}
