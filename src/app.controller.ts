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

@Controller()
export class AppController {
  readonly screwRepository = this.dataSource.getRepository(Screw);
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
  async update(@Param('id') id: number, @Body() dto: Partial<ScrewDto>) {
    return await this.screwRepository.update(id, {
      ...dto,
    });
  }

  @Post('/api/screw')
  async create(@Body() dto: ScrewDto) {
    return await this.screwRepository.save({
      ...dto,
    });
  }

  @Delete('/api/screw/:id')
  async delete(@Param('id') id: number) {
    return await this.screwRepository.delete(id);
  }
}
