import { JTDDataType } from 'ajv/dist/core';
import { ChangePasswordDto, UpdateAccountDto } from './dto';

export const UpdateAccountSchema: JTDDataType<UpdateAccountDto> = {
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    avatar: { type: 'string' },
    address: { type: 'string' },
    dob: { type: 'string' },
  },
};

export const ChangePasswordSchema: JTDDataType<ChangePasswordDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['currentPassword', 'newPassword'],
  properties: {
    currentPassword: { type: 'string' },
    newPassword: { type: 'string' },
  },
};
