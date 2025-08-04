import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { PlantsRepository } from './plants.repository.js';
import { UsersController } from '../users/users.controller.js';
import { UsersService } from '../users/users.service.js';

@Module({
  controllers: [PlantsController, UsersController],
  providers: [PlantsService, PlantsRepository, UsersService],
})
export class PlantsModule {}
