import { MySQLTableName, UserStatus, UserType } from '@constants/constant';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: MySQLTableName.USERS })
export class User extends Base {
  @Column({ name: 'username', type: 'varchar', length: 255, nullable: false })
  username: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    name: 'type',
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: UserType.MEMBER,
  })
  type: UserType;

  @Column({
    name: 'status',
    type: 'enum',
    nullable: false,
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email: string;

  @Column({ name: 'avatar', type: 'varchar', length: 255, nullable: true })
  avatar?: string;

  @Column({ name: 'phone', type: 'varchar', length: 255, nullable: true })
  phone?: string;

  @Column({ name: 'address', type: 'varchar', length: 255, nullable: true })
  address?: string;

  @Column({ name: 'dob', type: 'date', nullable: true })
  dob?: Date;
}
