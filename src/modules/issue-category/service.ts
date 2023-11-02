import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IssueCategory } from '@shared/models/issue-category.entity';
import { EntityManager } from 'typeorm';
import { CreateIssueCategoryDto, UpdateIssueCategoryDto } from './dto';

@Injectable()
export class IssueCategoryService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getIssueCategories(projectId: number) {
    const issueCategories = await this.entityManager
      .getRepository(IssueCategory)
      .find({
        where: { projectId },
      });
    return issueCategories;
  }

  async deleteIssueCategories(projectId: number, issueCategoryId: number) {
    const issueCategory = await this.entityManager
      .getRepository(IssueCategory)
      .findOne({
        where: { id: issueCategoryId, projectId },
      });
    if (!issueCategory) {
      throw new Error('Issue category not found');
    }
    await this.entityManager.getRepository(IssueCategory).remove(issueCategory);
    return true;
  }

  async getIssueCategory(projectId: number, issueCategoryId: number) {
    const issueCategory = await this.entityManager
      .getRepository(IssueCategory)
      .findOne({
        where: { id: issueCategoryId, projectId },
      });
    if (!issueCategory) {
      throw new Error('Issue category not found');
    }
    return issueCategory;
  }

  async updateIssueCategory(
    projectId: number,
    issueCategoryId: number,
    data: UpdateIssueCategoryDto,
  ) {
    const issueCategory = await this.entityManager
      .getRepository(IssueCategory)
      .findOne({
        where: { id: issueCategoryId, projectId },
      });
    if (!issueCategory) {
      throw new Error('Issue category not found');
    }
    await this.entityManager
      .getRepository(IssueCategory)
      .update(issueCategoryId, {
        ...data,
      });
    return true;
  }

  async createIssueCategory(projectId: number, data: CreateIssueCategoryDto) {
    const { key } = data;
    const issueCategory = await this.entityManager
      .getRepository(IssueCategory)
      .findOne({
        where: { key, projectId },
      });
    if (issueCategory) {
      throw new Error('Issue category already exists');
    }
    await this.entityManager.getRepository(IssueCategory).insert({
      ...data,
      projectId,
    });
    return true;
  }
}
