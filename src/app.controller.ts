import { alternativeOrderDto } from './alternativeOrder.dto';
import { OrderDto } from './order.dto';
import { Order } from './order.entity';
import { ScrewDto } from './screw.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import { Screw } from './screw.entity';
import { distinct } from 'rxjs';

@Controller()
export class AppController {
  readonly screwRepository = this.dataSource.getRepository(Screw);
  readonly orderRepository = this.dataSource.getRepository(Order);
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get()
  @Render('index')
  index() {
    return { message: 'Welcome to the homepage' };
  }

  @Get('/api/screw')
  async findAll() {
    return await this.screwRepository.find();
  }

  @Get('/api/screw/:id')
  async findOne(@Param('id') id: number) {
    return await this.screwRepository.findOneBy({ id: id });
  }

  @Put('/api/screw/:id')
  async update(@Param('id') id: number, @Body() dto: ScrewDto) {
    return await this.screwRepository.update(id, {
      ...dto,
    });
  }

  @Post('/api/screw')
  async createScrew(@Body() dto: ScrewDto) {
    return await this.screwRepository.save({
      ...dto,
    });
  }

  @Delete('/api/screw/:id')
  async delete(@Param('id') id: number) {
    return await this.screwRepository.delete(id);
  }

  @Post('/api/screw/:id/rendeles')
  async createOrder(@Param('id') id: number, @Body() orderDto: OrderDto) {
    const screw = await this.screwRepository.findOneBy({ id: id });

    if (screw.stock < orderDto.quantity) {
      return { error: 'Insufficient stock' };
    } else {
      this.screwRepository.update(id, {
        stock: screw.stock - orderDto.quantity,
      });

      this.orderRepository.save({
        screw: screw,
        quantity: orderDto.quantity,
      });

      return { total: orderDto.quantity * screw.price };
    }
  }

  @Post('/api/screw/rendeles')
  async alternativeCreateOrder(@Body() orderDto: alternativeOrderDto) {
    const screw = await this.screwRepository.findOneBy({
      id: orderDto.screwId,
    });

    if (screw.stock < orderDto.quantity) {
      return { error: 'Insufficient stock' };
    } else {
      this.screwRepository.update(orderDto.screwId, {
        stock: screw.stock - orderDto.quantity,
      });

      this.orderRepository.save({
        screw: screw,
        quantity: orderDto.quantity,
      });

      return { total: orderDto.quantity * screw.price };
    }
  }
}
