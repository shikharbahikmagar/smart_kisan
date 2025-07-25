import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UserRole } from 'src/constants/enum/user-role.enum';
import { User } from 'src/common/decorators/user.decorator';
import { authPayload } from '../auth/jwt.strategy';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @UseInterceptors(FileInterceptor('file'))
  @Post('create')
  async create(@Body() data: CreateOrderDto, @User() user: authPayload) {
    
      const orderResp = await this.ordersService.create(data, user.userId); 

      // console.log("New Order Detail", orderResp);

      if(orderResp) {
        return { message: 'Order created successfully', 
          totalAmount: orderResp.totalAmount, paymentMethod: orderResp.paymentMethod, transactionId: orderResp.transactionId, orderId: orderResp.orderId };
      }
      return { message: 'Failed to create order' };

  }


  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Get('user')
  async getUserOrders(@User() user: authPayload) {
    const orders = await this.ordersService.getUserOrders(user.userId);
    return {
      message: 'Orders fetched successfully',
      //return order so that in frontend we can show the order details easily with product details
      data: orders.map(order => ({
          customer: {
            fullName: order.full_name,
            email: order.email,
            phone: order.phone,
          },
          totalAmount: order.totalPrice,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          status: order.order_status,
          createdAt: order.createdAt,
          shippingAddress: order.s_address,
          shippingCity: order.s_city,
          shippingProvince: order.s_province,
          shippingTole: order.s_tole,
          transactionId: order.transactionId,
          orderId: order.id,
          orderItems: order.items.map(item => ({
            id: item.id,
            productId: item.productId,
            farmerShopId: item.farmerShopId,
            quantity: item.quantity,
            price: item.price,
            totalPrice: item.totalPrice,
            productName: item.product.name,
            productImage: item.product.image,
          }))
      })),
    }
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @Get('farmer')
  async getFarmerOrders(@User() user: authPayload) {
    const orders = await this.ordersService.getFarmerOrders(user.userId);

    return {
      message: 'Orders fetched successfully',

      data: orders.map(order => ({
        id: order.id,
        fullName: order.order.user.firstName + ' ' + order.order.user.lastName,
        email: order.order.user.email,
        phone: order.order.phone,
        address: order.order.s_address,
        totalAmount: order.price * order.quantity,
        paymentMethod: order.order.paymentMethod,
        paymentStatus: order.order.paymentStatus,
        status: order.order.order_status,
        createdAt: order.createdAt,
        productName: order.product.name,
        quantity: order.quantity,
        shippingAddress: order.order.s_address,
        shippingCity: order.order.s_city,
        shippingProvince: order.order.s_province,
        shippingTole: order.order.s_tole,
        
      })),
      
      
    };
  }

  // Update payment status
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Post('update-payment-status')
  async updatePaymentStatus(@Body('orderId') orderId: number, @User() user: authPayload) {
    // Handle the success callback from esewa
    return this.ordersService.handleEsewaSuccess(orderId, user.userId);
  }

  //get order details
  @UseGuards(RolesGuard)
  @Roles(UserRole.USER)
  @Get('details/:id')
  async getOrderDetails(@Param('id') id: string, @User() user: authPayload) {


    const orderDetails = await this.ordersService.getOrderDetails(+id, user.userId);

    return {
      message: 'Order details fetched successfully',
      data: {
        productName: orderDetails.product.name,
        productImage: orderDetails.product.image,
        quantity: orderDetails.quantity,
        price: orderDetails.price,
        totalPrice: orderDetails.totalPrice,
        orderId: orderDetails.orderId,
        paymentMethod: orderDetails.order.paymentMethod,
        transactionId: orderDetails.order.transactionId,
        shippingAddress: orderDetails.order.s_address,
        shippingCity: orderDetails.order.s_city,
        shippingProvince: orderDetails.order.s_province,
        shippingTole: orderDetails.order.s_tole,
        orderStatus: orderDetails.order.order_status,
        customer: {
          fullName: orderDetails.order.user.firstName + ' ' + orderDetails.order.user.lastName,
          email: orderDetails.order.user.email,
          phone: orderDetails.order.phone,
        },
    }
      };
    
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
