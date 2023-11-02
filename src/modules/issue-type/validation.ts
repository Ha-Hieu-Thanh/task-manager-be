import { JTDDataType } from 'ajv/dist/core';
import { CreateIssueTypeDto, UpdateIssueTypeDto } from './dto';

export const UpdateIssueTypeSchema: JTDDataType<UpdateIssueTypeDto> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};

export const CreateIssueTypeSchema: JTDDataType<CreateIssueTypeDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'key'],
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};
