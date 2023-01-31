import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Order } from './order.entity';

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

  @OneToMany(() => Order, (order) => order.screw)
  orders: Order[];
}
