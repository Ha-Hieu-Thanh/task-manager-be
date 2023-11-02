import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, In } from 'typeorm';
import { GetMembersQueryDto, InviteMembersDto, UpdateMembersDto } from './dto';
import { UserProject } from '@shared/models/user-project.entity';
import { User } from '@shared/models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { EEnvKey } from '@constants/constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MemberService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async inviteMembers(data: InviteMembersDto, projectId: number) {
    // use send grid to send confirm email to member with a redirect link
    const emails = data.members.map((member) => member.email);
    const roleMapByEmail = data.members.reduce((acc, member) => {
      acc[member.email] = member.role;
      return acc;
    }, {});
    // jwt hash information includes email, role, projectId
    const token = this.jwtService.signAsync(
      {
        email: emails[0],
        role: roleMapByEmail[emails[0]],
        projectId,
      },
      {
        secret: this.configService.get<string>(
          EEnvKey.JWT_ACCESS_TOKENS_SECRETS,
        ),
        expiresIn: this.configService.get<string>(
          EEnvKey.JWT_ACCESS_TOKENS_EXPIRES,
        ),
      },
    );
    // send email to member
  }

  async confirmInviteToken(inviteToken: string) {
    const decoded = await this.jwtService.verifyAsync(inviteToken, {
      secret: this.configService.get<string>(EEnvKey.JWT_ACCESS_TOKENS_SECRETS),
    });
    // if invite token is verified then extract the properties from it, otherwise throw exception
    const { email, role, projectId } = decoded;
    const user = await this.entityManager.getRepository(User).findOne({
      where: {
        email,
      },
    });

    // add to user-project
    const userProject = this.entityManager.getRepository(UserProject).create({
      userId: user.id,
      role,
      projectId,
    });
    await this.entityManager.getRepository(UserProject).save(userProject);
    return userProject;
  }

  async removeMember(userId: number, projectId: number) {
    const member = await this.entityManager.getRepository(UserProject).findOne({
      where: {
        userId,
        projectId,
      },
    });
    if (!member) throw new Error('Member not found');
    await this.entityManager.getRepository(UserProject).remove(member);
    return member;
  }

  async updateMember(data: UpdateMembersDto, projectId: number) {
    const members = data.members.map(async (member) => {
      const userProject = await this.entityManager
        .getRepository(UserProject)
        .findOne({
          where: {
            userId: member.memberId,
            projectId,
          },
        });
      if (!userProject) throw new Error('Member not found');
      userProject.role = member.role;
      return await this.entityManager
        .getRepository(UserProject)
        .save(userProject);
    });
    return await Promise.all(members);
  }

  async getMembersInProject(projectId: number, query: GetMembersQueryDto) {
    const { memberId, email, name, role, page = 1, limit = 100 } = query;
    const where = {
      projectId,
    };
    if (role) where['role'] = role;
    if (memberId) where['userId'] = memberId;
    if (email) where['email'] = email;
    if (name) where['name'] = name;

    const userProjects = await this.entityManager
      .getRepository(UserProject)
      .find({
        where,
        take: limit,
        skip: (page - 1) * limit,
      });
    const userIds = userProjects.map((userProject) => userProject.userId);
    const roleMapByUserId = userProjects.reduce((acc, userProject) => {
      acc[userProject.userId] = userProject.role;
      return acc;
    }, {});
    const members = await this.entityManager.getRepository(User).find({
      where: {
        id: In(userIds),
      },
    });
    const result = members.map((member) => {
      return {
        ...member,
        role: roleMapByUserId[member.id],
      };
    });
    return result;
  }

  async getMembersInSystem(query: GetMembersQueryDto) {
    const { memberId, email, name, page = 1, limit = 100 } = query;
    const where = {};
    if (memberId) where['id'] = memberId;
    if (email) where['email'] = email;
    if (name) where['name'] = name;
    const members = await this.entityManager.getRepository(User).find({
      where,
      take: limit,
      skip: (page - 1) * limit,
    });
    return members;
  }
}
