import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { IssueType } from '@shared/models/issue-type.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class IssueTypeService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}
}
