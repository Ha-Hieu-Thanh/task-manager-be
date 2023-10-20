import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn({ name: 'id', unsigned: true })
  id?: number;

  @Column({
    name: 'createdBy',
    type: 'integer',
    unsigned: true,
    nullable: true,
  })
  createdBy?: number;

  @Column({
    name: 'createdAt',
    type: 'timestamp',
    default: () => 'NOW()',
    nullable: false,
  })
  createdAt?: Date;

  @Column({
    name: 'updatedAt',
    type: 'timestamp',
    default: () => 'NOW()',
    nullable: false,
  })
  updatedAt?: Date;

  @Column({
    name: 'updatedBy',
    type: 'integer',
    unsigned: true,
    nullable: true,
  })
  updatedBy?: number;

  @DeleteDateColumn({ name: 'deletedAt', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Column({
    name: 'deletedBy',
    type: 'integer',
    unsigned: true,
    nullable: true,
  })
  deletedBy?: number;
}
