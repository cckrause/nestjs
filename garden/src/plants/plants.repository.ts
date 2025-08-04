import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

const FILE_PATH = 'src/plants/data/plants.json';

@Injectable()
export class PlantsRepository {
  async loadPlants() {
    const content = await readFile(FILE_PATH, 'utf-8');
    const plants = JSON.parse(content);

    return plants;
  }

  async savePlants(plants: any[]) {
    await writeFile(FILE_PATH, JSON.stringify(plants, null, 2), 'utf-8');
  }

  async findOne(id: string) {
    const plants = await this.loadPlants();
    return plants[id];
  }

  async findAll() {
    return await this.loadPlants();
  }

  async create(plant: {
    id: string;
    name: string;
    smells: boolean;
    price: number;
  }) {
    const plants = await this.loadPlants();

    plants[plant.id] = plant;

    await this.savePlants(plants);
  }
}
