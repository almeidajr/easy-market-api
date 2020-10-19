import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('purchases')
class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nfceId: string;

  @Column()
  code: number;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column()
  unit: string;

  @Column()
  totalPrice: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Purchase;
