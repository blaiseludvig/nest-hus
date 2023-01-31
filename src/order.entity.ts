import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Screw } from './screw.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Screw, (screw) => screw.orders)
  screw: Screw;
}
