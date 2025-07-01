import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartsService } from './carts.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { authPayload } from '../auth/jwt.strategy';

@Controller('cart')
export class CartsController {
  constructor(private readonly cartsService: CartsService) {}


  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Post(':productId/add')
  async addToCart(@Param('productId') productId:number, @Body() data: CreateCartDto, @User() user: authPayload) {

    const cart = await this.cartsService.addToCart(data, user.userId, productId);

    return {
      message: 'Product added to cart successfully',
      data: {
        id: cart.id,
        userId: cart.userId,
        productId: cart.productId,
        quantity: cart.quantity,
        unitPrice: cart.unitPrice,
        totalPrice: cart.totalPrice,
        discountPrice: cart.discountPrice,
        cartCode: cart.cartCode,
      },
    };
  }


  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Get()
  async getCartItems(@User() user: authPayload) {
    
    const cartItems = await this.cartsService.getCartItems(user.userId);


    if (cartItems.length === 0) {
      return {
        message: 'No items found in the cart',
        data: [],
      };
    }

    //get totla cart price
    const totalCartPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

    return {
      message: 'Cart items retrieved successfully',
      data: {
        items: cartItems.map(item => ({
          id: item.id,
          userId: item.userId,
          productId: item.productId,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice,
          discountPrice: item.discountPrice,
          cartCode: item.cartCode,
          image: item.product.image,
        })),
        totalCartPrice: totalCartPrice,
      },
      
    };

  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartsService.findOne(+id);  
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Post('update')
  async update(@Body() data: UpdateCartDto, @User() user: authPayload) {

    // console.log('hello from controller', data, user);

    const updatedCart = await this.cartsService.updateCart(user.userId, data);

    return {
      message: 'Cart updated successfully',
      data: {
        id: updatedCart.id,
        userId: updatedCart.userId,     
        productId: updatedCart.productId,
        quantity: updatedCart.quantity,
        unitPrice: updatedCart.unitPrice,
        totalPrice: updatedCart.totalPrice,
        discountPrice: updatedCart.discountPrice,
        cartCode: updatedCart.cartCode,
      },
    }
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Get('/remove/:id')
  async remove(@Param('id') id: number, @User() user: authPayload) {
    
    await this.cartsService.removeCartItem(user.userId, id);

    return {
      message: 'Cart item removed successfully',

    };
    
  }
}
