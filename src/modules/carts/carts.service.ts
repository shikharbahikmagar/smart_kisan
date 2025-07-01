import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
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
      throw new ConflictException('Product already exists in the cart');

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

  async updateCart(id: number, data: UpdateCartDto) {
    

    //console.log("helllo from service", data.cartId, data.quantity);

    const cart = await this.cartRepository.findOne({ where: { id: data.cartId } });


    if (!cart) {
      throw new NotFoundException('Cart not found');


    }

    const product = await this.productRepository.findOne({ where: { id: cart.productId } });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    console.log("prodct", product);

    // Check if the quantity is valid
    if (data.quantity <= 0) {
      throw new ConflictException('Quantity must be at least 1');
    } else if (data.quantity > product.stock) {
      throw new ConflictException('Quantity exceeds available stock');
    }

    //console.log("fasdf",cart)

    // Update the cart with the new data
    Object.assign(cart, data);

    // Save the updated cart
    const updatedCart = await this.cartRepository.save(cart);

    return updatedCart;

  }

  async removeCartItem(userId: number, cartId: number) {
    
    const cart = await this.cartRepository.findOneOrFail({ where: { id: cartId, userId: userId } })

    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }

    await this.cartRepository.remove(cart);

    return {
      message: 'Cart item removed successfully',
    }

  }
}
