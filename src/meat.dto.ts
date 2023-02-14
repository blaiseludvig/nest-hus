import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export default class MeatDto {
  @IsString()
  @IsNotEmpty()
  animal: string;

  @IsString()
  @IsNotEmpty()
  cut: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsPositive()
  @IsNumber()
  price: number;
}
