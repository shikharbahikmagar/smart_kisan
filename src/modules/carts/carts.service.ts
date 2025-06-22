import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { Exception } from 'handlebars';

@Injectable()
export class CartsService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}
  
  async addToCart(data: CreateCartDto, userId: number, productId: number): Promise<Cart> {

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }


    const product = await this.productRepository.findOne({ where: { id: productId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const existingCart = await this.cartRepository.findOne(
     { where: [
        { userId: user.id, productId: product.id },
      ]}
    )

    if (existingCart) {
      // if the product already exists in the cart, show error messsage product already exists in the cart
      throw new NotFoundException('Product already exists in the cart');

    }

    const existingCartCode = await this.cartRepository.findOne({
      where: { userId: user.id },
      select: ['cartCode'],
    })

    //for the first time adding product to the cart, create a new cartcode for the user if user again adds the product to the cart, then use the same cartcode
    //generate a unique cart code
    if( !existingCartCode) {
      const cartCode = `CART-${user.id}-${Date.now()}`;

    }

    const cartCode = existingCartCode ? existingCartCode.cartCode : `CART-${user.id}-${Date.now()}`;



    const cart = this.cartRepository.create({
      userId: user.id,
      productId: product.id,
      cartCode: cartCode,
      quantity: data.quantity,
      unitPrice: product.price,
      totalPrice: data.quantity * product.price,
      discountPrice: data.discountPrice || 0,
    });


    return this.cartRepository.save(cart);
  }



  async getCartItems(userId: number): Promise<Cart[]> {
   
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const cartItems = await this.cartRepository.find({
      where: { userId: user.id },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new NotFoundException('No items found in the cart');
    }

    // Calculate total price for each cart item
    cartItems.forEach(item => {
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.discountPrice) {
        item.totalPrice -= item.discountPrice;
      }
    });

    return cartItems;

  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
