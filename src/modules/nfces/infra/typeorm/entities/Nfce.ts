import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('nfces')
class Nfce {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column({ nullable: true })
  consumerId?: string;

  @Column()
  issuerId: string;

  @Column()
  sourceUrl: string;

  @Column()
  accessKey: string;

  @Column()
  additionalInformation: string;

  @Column()
  operationDestinationId: string;

  @Column()
  finalCostumerId: string;

  @Column()
  buyerPresenceId: string;

  @Column()
  model: number;

  @Column()
  series: number;

  @Column()
  number: number;

  @Column()
  emissionDate: Date;

  @Column()
  amount: number;

  @Column()
  icmsBasis: number;

  @Column()
  icmsValue: number;

  @Column()
  protocol: number;

  @Column()
  paymentMethodId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Nfce;
