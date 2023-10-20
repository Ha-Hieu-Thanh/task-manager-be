import { MySQLTableName, ProjectStatus } from '@constants/constant';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: MySQLTableName.PRORJECTS })
export class Project extends Base {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'key', type: 'varchar', length: 255, nullable: false })
  key: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'status',
    type: 'enum',
    nullable: false,
    enum: ProjectStatus,
    default: ProjectStatus.OPEN,
  })
  status: ProjectStatus;
}
