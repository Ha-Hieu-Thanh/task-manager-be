import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { User } from '@shared/models/user.entity';
import { EntityManager } from 'typeorm';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { ChangePasswordDto, UpdateAccountDto } from './dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getMyAccount(userId: number) {
    const user = await this.entityManager
      .createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :userId', { userId })
      .getOne();
    return user;
  }

  async updateAccount(userId: number, data: UpdateAccountDto) {
    const user = await this.entityManager
      .createQueryBuilder()
      .update(User)
      .set({
        ...data,
      })
      .where('id = :userId', { userId })
      .execute();
    return user;
  }

  async changePassword(userId: number, data: ChangePasswordDto) {
    const { currentPassword, newPassword } = data;
    const user = await this.getMyAccount(userId);
    if (compareSync(currentPassword, user.password)) {
      await this.entityManager
        .createQueryBuilder()
        .update(User)
        .set({
          password: hashSync(newPassword, genSaltSync(10)),
        })
        .where('id = :userId', { userId })
        .execute();
      return true;
    } else {
      throw new Error('Current password is wrong');
    }
  }
}
