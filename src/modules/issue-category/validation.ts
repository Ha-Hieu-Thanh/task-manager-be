import { JTDDataType } from 'ajv/dist/core';
import { CreateIssueCategoryDto, UpdateIssueCategoryDto } from './dto';

export const UpdateIssueCategorySchema: JTDDataType<UpdateIssueCategoryDto> = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};

export const CreateIssueCategorySchema: JTDDataType<CreateIssueCategoryDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'key'],
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};
