import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IssueType } from '@shared/models/issue-type.entity';
import { EntityManager } from 'typeorm';
import { CreateIssueTypeDto, UpdateIssueTypeDto } from './dto';

@Injectable()
export class IssueTypeService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getIssueTypes(projectId: number) {
    const issueTypes = await this.entityManager.getRepository(IssueType).find({
      where: { projectId },
    });
    return issueTypes;
  }

  async deleteIssueTypes(projectId: number, issueTypeId: number) {
    const issueType = await this.entityManager
      .getRepository(IssueType)
      .findOne({
        where: { id: issueTypeId, projectId },
      });
    if (!issueType) {
      throw new Error('Issue type not found');
    }
    await this.entityManager.getRepository(IssueType).remove(issueType);
    return true;
  }

  async getIssueType(projectId: number, issueTypeId: number) {
    const issueType = await this.entityManager
      .getRepository(IssueType)
      .findOne({
        where: { id: issueTypeId, projectId },
      });
    if (!issueType) {
      throw new Error('Issue type not found');
    }
    return issueType;
  }

  async updateIssueType(
    projectId: number,
    issueTypeId: number,
    data: UpdateIssueTypeDto,
  ) {
    const issueType = await this.entityManager
      .getRepository(IssueType)
      .findOne({
        where: { id: issueTypeId, projectId },
      });
    if (!issueType) {
      throw new Error('Issue type not found');
    }
    await this.entityManager.getRepository(IssueType).update(issueTypeId, {
      ...data,
    });
    return true;
  }

  async createIssueType(projectId: number, data: CreateIssueTypeDto) {
    const { key } = data;
    const issueType = await this.entityManager
      .getRepository(IssueType)
      .findOne({
        where: { key, projectId },
      });
    if (issueType) {
      throw new Error('Issue type already exists');
    }
    const newIssueType = await this.entityManager
      .getRepository(IssueType)
      .save({
        ...data,
        projectId,
      });
    return newIssueType;
  }
}
