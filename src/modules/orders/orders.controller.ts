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
        return { message: 'Order created successfully', totalAmount: orderResp.totalAmount, paymentMethod: orderResp.paymentMethod };
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
      data: orders,
    }
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.FARMER)
  @Get('farmer')
  async getFarmerOrders(@User() user: authPayload) {
    const orders = await this.ordersService.getFarmerOrders(user.userId);

    return {
      message: 'Orders fetched successfully',
      data: orders,
    }
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
