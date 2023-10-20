import { MySQLTableName } from '@constants/constant';
import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: MySQLTableName.ISSUES_CATEGORIES })
export class IssueCategory extends Base {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'key', type: 'varchar', length: 255, nullable: false })
  key: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description?: string;

  @Column({
    name: 'projectId',
    type: 'integer',
    unsigned: true,
    nullable: false,
  })
  projectId: number;
}
