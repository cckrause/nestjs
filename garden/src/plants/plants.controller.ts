import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlantDto } from './dtos/plant.dto';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  plantsService: PlantsService;

  constructor(service: PlantsService) {
    this.plantsService = service;
  }

  @Get()
  listPlants() {
    return this.plantsService.findAll();
  }

  @Post()
  createPlant(@Body() body: CreatePlantDto) {
    return this.plantsService.create(body);
  }

  @Get(':id')
  async getPlant(@Param('id') id: string) {
    const plant = await this.plantsService.findOne(id);

    if (!plant) {
      throw new NotFoundException(`Plant with id ${id} not found`);
    }

    return plant;
  }
}
