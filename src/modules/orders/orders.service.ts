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
import { Product } from '../product/entities/product.entity';
import { FarmerShop } from '../farmer-shop/entities/farmer-shop.entity';

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
  @InjectRepository(Product)
  private readonly productRepository: Repository<Product>;
  @InjectRepository(FarmerShop)
  private readonly farmerShopRepository: Repository<FarmerShop>;

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

      //transactionId generation logic


      const orderData = {

        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        userId: user.id,
        s_address: data.SAddress,
        s_city: data.SCity,
        s_province: data.SProvince,
        s_tole: data.STole,
        totalPrice: cart.reduce((total, item) => total + (item.product.price * item.quantity), 0),
        order_status: OrderStatus.PENDING,
        paymentMethod: data.paymentMethod,
        paymentStatus: PaymentStatus.PENDING,
        transactionId: data.transactionId, 

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

      //reduce the product stock
      await Promise.all(cart.map(async (cartItem) => {
        const product = await this.productRepository.findOne({ where: { id: cartItem.productId } });
        if (product) {
          product.stock -= cartItem.quantity;
          await this.productRepository.save(product);
        }
      }));

      // console.log("new order", order)

      // console.log("new order items", newOrderItems);

      // Clear the cart after order creation
      await this.cartRepository.delete({ userId: user.id });  

      const totalAmount = newOrderItems.reduce((total, item) => total + item.totalPrice, 0);

      console.log("Total Amount", totalAmount);

      //generate transactionId if payment method is not cash on delivery
     
      

      if(order && newOrderItems)
      {
        return {
          totalAmount: totalAmount,
          paymentMethod: data.paymentMethod,
          transactionId: order.transactionId,
          orderId: order.id,
        };
      }

  }

  async handleEsewaSuccess(orderId: number, userId?: number) {
    
    const order = await this.orderRepository.findOne({
      where: { id: orderId, userId: userId },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Update the payment status
    order.paymentStatus = PaymentStatus.COMPLETED;

    // Save the updated order
    await this.orderRepository.save(order);

    return {
      message: 'Payment successful',
      orderId: order.id,
      totalAmount: order.totalPrice,
      paymentMethod: order.paymentMethod,
      transactionId: order.transactionId,
    };
  }

  async getUserOrders(userId: number) {
    const orders = await this.orderRepository.find(
      { where: { userId },
      relations: ['items', 'items.product', 'items.farmerShop']  }
    );
    return orders;
  }

  async getFarmerOrders(farmerId: number) {

    //get farmer shop details first
    const farmerShop = await this.farmerShopRepository.findOne({ where: { userId: farmerId } });

    if (!farmerShop) {
      throw new NotFoundException('Farmer shop not found');
    }

    const farmerShopId = farmerShop.id;

    const orders = await this.orderItemRepository.find({ where: { farmerShopId: farmerShopId },
      relations: ['order', 'product', 'product.farmerShop', 'order.user']
    });
  

    console.log("ordder hai", orders);
    
    return orders;
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
