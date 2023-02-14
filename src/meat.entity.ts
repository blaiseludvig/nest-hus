import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Meat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  animal: string;

  @Column()
  type: string;

  @Column()
  cut: string;

  @Column({ type: 'decimal', scale: 2 })
  price: number;
}
