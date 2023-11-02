import { MySQLTableName } from '@constants/constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProjectMemberGuard implements CanActivate {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.user.id;
    const projectId = request.headers['project-id'];

    if (userId && projectId) {
      const project = this.entityManager
        .createQueryBuilder()
        .select('project')
        .from(MySQLTableName.PRORJECTS, 'project')
        .where('project.id = :projectId', { projectId })
        .getOne();
      if (!project) return false;

      const userProject = this.entityManager
        .createQueryBuilder()
        .select('userProject')
        .from(MySQLTableName.USER_PROJECTS, 'userProject')
        .where('userProject.user_id = :userId', { userId })
        .andWhere('userProject.project_id = :projectId', { projectId })
        .getOne();
      if (!userProject) return false;
      return true;
    } else {
      return false;
    }
  }
}
