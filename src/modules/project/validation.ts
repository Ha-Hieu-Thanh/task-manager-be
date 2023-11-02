import { JTDDataType } from 'ajv/dist/core';
import { CreateProjectDto, UpdateProjectDto } from './dto';

export const CreateProjectSchema: JTDDataType<CreateProjectDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['name', 'key'],
  properties: {
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};

export const UpdateProjectSchema: JTDDataType<UpdateProjectDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['id'],
  properties: {
    id: { type: 'integer' },
    name: { type: 'string' },
    key: { type: 'string' },
    description: { type: 'string' },
  },
};
