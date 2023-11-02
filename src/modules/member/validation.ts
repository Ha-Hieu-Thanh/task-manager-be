import { JTDDataType } from 'ajv/dist/core';
import {
  GetMembersQueryDto,
  InviteMembersDto,
  UpdateMembersDto,
  VerifyCodeDto,
} from './dto';

export const InviteMembersSchema: JTDDataType<InviteMembersDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['members'],
  properties: {
    members: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['email', 'role'],
        properties: {
          email: { type: 'string' },
          role: { type: 'string' },
        },
      },
      minimum: 1,
    },
  },
};

export const UpdateMembersSchema: JTDDataType<UpdateMembersDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['members'],
  properties: {
    members: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['memberId', 'role'],
        properties: {
          memberId: { type: 'integer' },
          role: { type: 'string' },
        },
      },
      minimum: 1,
    },
  },
};

export const GetMembersQuerySchema: JTDDataType<GetMembersQueryDto> = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    memberId: { type: 'integer' },
    email: { type: 'string' },
    name: { type: 'string' },
    role: { type: 'string' },
    page: { type: 'string' },
    limit: { type: 'string' },
  },
};

export const VerifyCodeSchema: JTDDataType<VerifyCodeDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['code'],
  properties: {
    code: { type: 'string' },
  },
};
