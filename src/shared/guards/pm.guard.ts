import { MySQLTableName, RoleType, UserType } from '@constants/constant';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { EntityManager } from 'typeorm';

@Injectable()
export class ProjectManagerGuard implements CanActivate {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const userId = user.userId;
    const projectId = request.headers['project-id'];
    if (user.role === UserType.ADMIN) return true;

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
        .andWhere('userProject.role = :role', {
          role: RoleType.PROJECT_MANAGER,
        })
        .getOne();
      if (!userProject) return false;
      return true;
    } else {
      return false;
    }
  }
}
