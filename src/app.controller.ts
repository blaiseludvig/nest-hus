import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { AppService } from './app.service';
import MeatDto from './meat.dto';
import Meat from './meat.entity';

@Controller()
export class AppController {
  readonly meatRepository = this.dataSource.getRepository(Meat);
  constructor(
    private readonly appService: AppService,
    private dataSource: DataSource,
  ) {}

  @Get('/api/meat')
  async findAll() {
    return await this.meatRepository.find();
  }

  @Get('/api/meat/:id')
  async findOne(@Param('id') id: number) {
    return await this.meatRepository.findOneBy({ id: id });
  }

  @Post('/api/meat')
  async createOne(@Body() dto: MeatDto) {
    return await this.meatRepository.save({
      ...dto,
    });
  }

  @Delete('/api/meat/:id')
  async deleteOne(@Param('id') id: number) {
    return await this.meatRepository.delete(id);
  }
}
