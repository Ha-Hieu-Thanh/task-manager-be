import { IssueStateType, MySQLTableName } from '@constants/constant';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: MySQLTableName.ISSUES })
export class Issue extends Base {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'projectId',
    type: 'integer',
    unsigned: true,
    nullable: false,
  })
  projectId: number;

  @Column({
    name: 'categoryId',
    type: 'integer',
    unsigned: true,
    nullable: true,
  })
  categoryId?: number;

  @Column({
    name: 'stateId',
    type: 'integer',
    unsigned: true,
    nullable: false,
    default: 0,
  })
  stateId: number;

  @Column({ name: 'typeId', type: 'integer', unsigned: true, nullable: true })
  typeId?: number;

  @Column({
    name: 'priorityId',
    type: 'integer',
    unsigned: true,
    nullable: false,
  })
  priorityId: number;

  @Column({
    name: 'assigneeId',
    type: 'integer',
    unsigned: true,
    nullable: false,
  })
  assigneeId: number;

  @Column({ name: 'deadline', type: 'date', nullable: true })
  deadline?: Date;

  @Column({ name: 'estimate', type: 'decimal', nullable: true })
  estimateHours?: number;

  @Column({ name: 'spent', type: 'decimal', nullable: true })
  actualHours?: number;
}
