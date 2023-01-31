import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Screw {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  type: string;

  @Column('int')
  size: number;

  @Column('int')
  stock: number;

  @Column({ type: 'decimal', scale: 2 })
  price: number;
}
