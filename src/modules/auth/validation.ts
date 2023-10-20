import { JTDDataType } from 'ajv/dist/core';
import { LoginDto, SignUpDto } from './dto';

export const LoginSchema: JTDDataType<LoginDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['username', 'password'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
  },
};

export const SignUpSchema: JTDDataType<SignUpDto> = {
  type: 'object',
  additionalProperties: false,
  required: ['username', 'password', 'name', 'email'],
  properties: {
    username: { type: 'string' },
    password: { type: 'string' },
    name: { type: 'string' },
    email: { type: 'string' },
    phone: { type: 'string' },
    address: { type: 'string' },
    dob: { type: 'string' },
  },
};
