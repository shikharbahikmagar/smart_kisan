import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FarmerShop } from '../farmer-shop/entities/farmer-shop.entity';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(FarmerShop)
    private readonly farmerShopRepository: Repository<FarmerShop>,
  ) {}

  async postProduct(data: CreateProductDto, userId: number): Promise<Product> {


    const farmerShopId = await this.farmerShopRepository.findOne(
      {
        where: { userId: userId },
        select: ['id'],
      }
    )

    if (!farmerShopId) {
      throw new NotFoundException(`Farmer shop not found for user with id ${userId}`);
    }

    const newProduct = this.productRepository.create({
      ...data,
      farmerShopId: farmerShopId.id});

    const product = await this.productRepository.save(newProduct);

    return product;
  }



  async getAllProducts() {

    //get all products from the database
    const products = await this.productRepository.find(
      {
        relations: ['category', 'farmerShop'],
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          categoryId: true,
          farmerShopId: true,
          createdAt: true,
          updatedAt: true,
          category: {
            id: true,
            name: true,
            icon: true,
          },
          farmerShop: {
            id: true,
            shopName: true,
            shopAddress: true,
            shopDescription: true,
            shopImage: true,
          },
        },
      }
    )



    return products;
  }


    async AllProducts() {

    //get all products from the database
    const products = await this.productRepository.find(
      {
        relations: ['category', 'farmerShop'],
        where: { isAvailable: true },
        order: {
          createdAt: 'DESC',
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          image: true,
          categoryId: true,
          farmerShopId: true,
          createdAt: true,
          updatedAt: true,
          category: {
            id: true,
            name: true,
            icon: true,
          },
          farmerShop: {
            id: true,
            shopName: true,
            shopAddress: true,
            shopDescription: true,
            shopImage: true,
          },
        },
      }
    )



    return products;
  }

  async productDetails(id: number) {
    
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['category', 'farmerShop'],
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        stock: true,
        isAvailable: true,
        isFeatured: true,
        discountPercentage: true,
        isDiscountActive: true,
        discountStart: true,
        discountEnd: true,
        discountedPrice: true,
        image: true,
        category: {
          id: true,
          name: true,
          icon: true,
        },
        farmerShop: {
          id: true,
          shopName: true,
          shopAddress: true,
          shopDescription: true,
          shopImage: true,
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    return product;

  }

  async updateProduct(id: number, data: UpdateProductDto) {
    
    const product = await this.productRepository.findOne({ where: { id } });

    if(!product)
    {
      throw new NotFoundException(`Product not found`); 
    }


    Object.assign(product, data);

    const updatedProduct = await this.productRepository.save(product);

    return updatedProduct;


  }

  async updateProductStatus(id: number) {


    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    // Toggle the status
    product.isAvailable = !product.isAvailable;

    const updatedProduct = await this.productRepository.save(product);

    return updatedProduct;
  }

  async deleteProduct(id: number) {
    
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException(`Product not found`);
    }

    await this.productRepository.remove(product);

    return {
      message: `Product deleted successfully`,
    };
  }
}
