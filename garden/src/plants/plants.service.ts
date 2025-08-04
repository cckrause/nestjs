import { Injectable } from '@nestjs/common';
import { PlantsRepository } from './plants.repository.js';

@Injectable()
export class PlantsService {
  plantsRepo: PlantsRepository;

  constructor(repo: PlantsRepository) {
    this.plantsRepo = repo;
  }

  findOne(id: string) {
    return this.plantsRepo.findOne(id);
  }

  findAll() {
    return this.plantsRepo.findAll();
  }

  create(plant) {
    this.plantsRepo.create(plant);
  }
}
