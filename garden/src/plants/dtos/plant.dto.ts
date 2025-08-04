import { IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreatePlantDto {
  @IsString()
  name: string;
  @IsBoolean()
  smells: boolean;
  @IsNumber()
  price: number;
}
