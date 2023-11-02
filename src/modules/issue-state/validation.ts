import { JTDDataType } from 'ajv/dist/core';
import {
  UpdateIssueStateDto,
  UpdateIssueStateOrderDto,
  UpdateIssueStateOrdersDto,
} from './dto';

export const UpdateIssueStateSchema: JTDDataType<UpdateIssueStateDto> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};

export const UpdateIssueStateOrderSchema: JTDDataType<UpdateIssueStateOrderDto> =
  {
    type: 'object',
    additionalProperties: false,
    required: ['order', 'issueStateId'],
    properties: {
      order: { type: 'number' },
      issueStateId: { type: 'number' },
    },
  };

export const UpdateIssueStateOrdersSchema: JTDDataType<UpdateIssueStateOrdersDto> =
  {
    type: 'object',
    additionalProperties: false,
    required: ['orders'],
    properties: {
      orders: {
        type: 'array',
        items: UpdateIssueStateOrderSchema,
      },
    },
  };

export const CraeteIssueStateSchema: JTDDataType<UpdateIssueStateDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'key'],
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};
