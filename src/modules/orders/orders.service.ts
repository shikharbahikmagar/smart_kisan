import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Cart } from '../carts/entities/cart.entity';
import { OrderStatus } from 'src/constants/enum/order-status-enum';
import { PaymentStatus } from 'src/constants/enum/payment-status-enum';
import { OrderItem } from '../order_items/entities/order_item.entity';

@Injectable()
export class OrdersService {

  @InjectRepository(Order)
  private readonly orderRepository: Repository<Order>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Cart)
  private readonly cartRepository: Repository<Cart>;
  @InjectRepository(OrderItem)
  private readonly orderItemRepository: Repository<OrderItem>;

  async create(data: CreateOrderDto, userId: number) {
    
      const user = await this.userRepository.findOne({
        where: { id: userId },
        select: ['id', 'firstName', 'lastName', 'email'],
      });

      if(!user) {
        throw new NotFoundException('User not found');
      }

      const cart = await this.cartRepository.find({
        where: { userId: user.id },
        relations: ['product'],
      });

      // console.log("cart", cart);

      if (!cart || cart.length === 0) {
        throw new NotFoundException('Cart is empty, Please add items to the cart before placing an order.');
      }

      const orderData = {

        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        userId: user.id,
        s_address: data.s_address,
        s_city: data.s_city,
        s_province: data.s_province,
        s_tole: data.s_tole,
        totalPrice: cart.reduce((total, item) => total + (item.product.price * item.quantity), 0),
        order_status: OrderStatus.PENDING,
        paymentMethod: data.paymentMethod,
        paymentStatus: PaymentStatus.PENDING,

      }

      const newOrder = this.orderRepository.create(orderData);

      const order = await this.orderRepository.save(newOrder);

      //save the cart items to the order one by one 
      const orderItems = cart.map((cartItem) => (
        // console.log(cartItem.product.farmerShopId),
        {
       
        orderId: order.id,
        productId: cartItem.productId,
        farmerShopId: cartItem.product.farmerShopId,
        quantity: cartItem.quantity,
        price: cartItem.product.price,
        totalPrice: cartItem.product.price * cartItem.quantity,
        order_status: OrderStatus.PENDING,
        paymentMethod: data.paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        
      }));

      const newOrderItems = await this.orderItemRepository.save(orderItems);


      // console.log("new order", order)

      // console.log("new order items", newOrderItems);

      // Clear the cart after order creation
      await this.cartRepository.delete({ userId: user.id });  

      return order;
      

  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
