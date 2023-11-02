import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IssueState } from '@shared/models/issue-state.entity';
import { EntityManager } from 'typeorm';
import {
  CreateIssueStateDto,
  UpdateIssueStateDto,
  UpdateIssueStateOrderDto,
  UpdateIssueStateOrdersDto,
} from './dto';

@Injectable()
export class IssueStateService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getIssueStates(projectId: number) {
    const issueStates = await this.entityManager
      .getRepository(IssueState)
      .find({
        where: { projectId },
        order: { order: 'ASC' },
      });
    return issueStates;
  }

  async deleteIssueStates(projectId: number, issueStateId: number) {
    const issueState = await this.entityManager
      .getRepository(IssueState)
      .findOne({
        where: { id: issueStateId, projectId },
      });
    if (!issueState) {
      throw new Error('Issue state not found');
    }
    await this.entityManager.getRepository(IssueState).remove(issueState);
    return true;
  }

  async getIssueState(projectId: number, issueStateId: number) {
    const issueState = await this.entityManager
      .getRepository(IssueState)
      .findOne({
        where: { id: issueStateId, projectId },
      });
    if (!issueState) {
      throw new Error('Issue state not found');
    }
    return issueState;
  }

  async updateIssueState(
    projectId: number,
    issueStateId: number,
    data: UpdateIssueStateDto,
  ) {
    const issueState = await this.entityManager
      .getRepository(IssueState)
      .findOne({
        where: { id: issueStateId, projectId },
      });
    if (!issueState) {
      throw new Error('Issue state not found');
    }
    await this.entityManager.getRepository(IssueState).update(issueStateId, {
      ...data,
    });
    return true;
  }

  async updateIssueStateOrder(
    projectId: number,
    data: UpdateIssueStateOrdersDto,
  ) {
    const issueStates = await this.entityManager
      .getRepository(IssueState)
      .find({
        where: { projectId },
      });
    if (!issueStates) {
      throw new Error('Issue state not found');
    }
    const issueStatesMap = issueStates.reduce((acc, issueState) => {
      acc[issueState.id] = issueState;
      return acc;
    }, {});
    for (const order of data.orders) {
      const issueState = issueStatesMap[order.issueStateId];
      if (!issueState) {
        throw new Error('Issue state not found');
      }
      await this.entityManager.getRepository(IssueState).update(issueState.id, {
        order: order.order,
      });
    }
    return true;
  }

  async createIssueState(projectId: number, data: CreateIssueStateDto) {
    const { key } = data;
    const issueState = await this.entityManager
      .getRepository(IssueState)
      .findOne({
        where: { key, projectId },
      });
    if (issueState) {
      throw new Error('Issue state already exists');
    }

    // get number of state
    const order =
      (await this.entityManager.getRepository(IssueState).count({
        where: { projectId },
      })) + 1;

    const newIssueState = await this.entityManager
      .getRepository(IssueState)
      .create({
        ...data,
        order,
        projectId,
      });
    await this.entityManager.getRepository(IssueState).save(newIssueState);
    return newIssueState;
  }
}
