export class UpdateAccountDto {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: string;
  dob?: Date;
}

export class ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}
