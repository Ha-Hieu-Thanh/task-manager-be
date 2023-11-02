import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { Project } from '@shared/models/project.entity';
import { UserProject } from '@shared/models/user-project.entity';
import { In } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(@InjectEntityManager() private readonly entityManager) {}

  async createProject(data: CreateProjectDto) {
    const { key } = data;
    const project = await this.entityManager
      .getRepository(Project)
      .findOne({ key });
    if (project) {
      throw new Error('Project already exists');
    }
    const newProject = await this.entityManager
      .getRepository(Project)
      .save(data);
    return newProject;
  }

  async updateProject(data: UpdateProjectDto) {
    const { id } = data;
    const project = await this.entityManager
      .getRepository(Project)
      .findOne({ id });
    if (!project) {
      throw new Error('Project not found');
    }
    const updatedProject = await this.entityManager
      .getRepository(Project)
      .save(data);
    return updatedProject;
  }

  async deleteProject(id: number) {
    const project = await this.entityManager
      .getRepository(Project)
      .findOne({ id });
    if (!project) {
      throw new Error('Project not found');
    }
    await this.entityManager.getRepository(Project).delete({ id });
    return true;
  }

  async getMemberProjects(userId: number) {
    const userProjects = await this.entityManager
      .getRepository(UserProject)
      .find({ userId });
    if (!userProjects) {
      throw new Error('User has no projects');
    }
    const projectIds = userProjects.map((userProject) => userProject.projectId);
    const roleMapByProjectId = userProjects.reduce((acc, userProject) => {
      acc[userProject.projectId] = userProject.role;
      return acc;
    }, {});
    const projects = await this.entityManager.getRepository(Project).find({
      id: In(projectIds),
    });
    const result = projects.map((project) => {
      return {
        ...project,
        role: roleMapByProjectId[project.id],
      };
    });
    return result;
  }

  async getAllProjects() {
    const projects = await this.entityManager.getRepository(Project);
    return projects;
  }
}
