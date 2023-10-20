export class LoginDto {
  username: string;
  password: string;
}

export class SignUpDto {
  username: string;
  password: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  dob?: Date;
}
