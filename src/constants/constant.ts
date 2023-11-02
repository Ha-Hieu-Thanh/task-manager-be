import { Request } from 'express';

export enum EEnvKey {
  NODE_ENV = 'NODE_ENV',
  PORT = 'PORT',
  API_PREFIX = 'API_PREFIX',
  SWAGGER_PATH = 'SWAGGER_PATH',
  MYSQL_HOST = 'MYSQL_HOST',
  MYSQL_PORT = 'MYSQL_PORT',
  MYSQL_USERNAME = 'MYSQL_USERNAME',
  MYSQL_PASSWORD = 'MYSQL_PASSWORD',
  MYSQL_DB = 'MYSQL_DB',
  JWT_ACCESS_TOKENS_SECRETS = 'JWT_ACCESS_TOKENS_SECRETS',
  JWT_ACCESS_TOKENS_EXPIRES = 'JWT_ACCESS_TOKENS_EXPIRES',
  JWT_REFRESH_TOKENS_SECRETS = 'JWT_REFRESH_TOKENS_SECRETS',
  JWT_REFRESH_TOKENS_EXPIRES = 'JWT_REFRESH_TOKENS_EXPIRES',
  SEND_GRID_API_KEY = 'SEND_GRID_API_KEY',
}

export enum MySQLTableName {
  USERS = 'users',
  PRORJECTS = 'projects',
  ISSUES = 'issues',
  ISSUES_CATEGORIES = 'issues_categories',
  ISSUES_STATES = 'issues_states',
  ISSUES_TYPES = 'issues_types',
  ISSUES_PRIORITIES = 'issues_priorities',
  USER_PROJECTS = 'user_projects',
}

export enum UserType {
  MEMBER = 0,
  ADMIN = 1,
}

export enum RoleType {
  PROJECT_MEMBER = 0,
  PROJECT_MANAGER = 1,
}

export enum IssueStateType {
  OPEN = 0,
  CLOSED = 999,
}

export enum ProjectStatus {
  OPEN = 1,
  CLOSED = 0,
}

export enum UserStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

export enum EGuardDecoratorKey {
  PUBLIC = 'PUBLIC',
  ROLES = 'ROLES',
}

export interface IJwtPayload {
  userId: number;
  type: UserType;
}

export interface AuthenticatedRequest extends Request {
  user?: IJwtPayload;
}
export const REGEX_PASSWORD =
  '^(?=.*?[0-9])(?=.*?[A-Za-z])[A-Za-z0-9!@#$%^&*.]{8,25}$';
export const REGEX_EMAIL = '^[\\w\\-\\.]+@([\\w\\-]+\\.)+[\\w\\-]{2,4}$';
export const REGEX_PHONE = '^(\\+84|\\+81|0)[1-9]([0-9]{8,11})$';
export const REGEX_EMAIL_OR_PHONE = `^(${REGEX_EMAIL}|${REGEX_PHONE})$`;
export const REGEX_IMAGE = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;
export const REGEX_HH_COLON_MM = '^([0-1][0-9]|2[0-3]):[0-5][0-9]$';
