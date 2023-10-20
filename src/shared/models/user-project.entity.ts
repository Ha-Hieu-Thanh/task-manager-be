import { MySQLTableName, RoleType } from '@constants/constant';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: MySQLTableName.USER_PROJECTS })
export class UserProject extends Base {
  @Column({ name: 'userId', type: 'integer', unsigned: true, nullable: false })
  userId: number;

  @Column({
    name: 'projectId',
    type: 'integer',
    unsigned: true,
    nullable: false,
  })
  projectId: number;

  @Column({
    name: 'role',
    type: 'enum',
    enum: RoleType,
    nullable: false,
    default: RoleType.PROJECT_MEMBER,
  })
  role: RoleType;
}
