import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  AdminPermission,
  ManagerPermission,
  MemberPermission,
  UserPermission,
} from '@shared/decorators/permission.decorator';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import {
  GetMembersQueryDto,
  InviteMembersDto,
  UpdateMembersDto,
  VerifyCodeDto,
} from './dto';
import { GetMembersQuerySchema, VerifyCodeSchema } from './validation';
import { MemberService } from './service';

// check pm
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ManagerPermission()
  @Post('/invite')
  async inviteMember(
    @Body(new AJVValidationPipe(InviteMembersDto)) data: InviteMembersDto,
  ) {}

  @ManagerPermission()
  @Delete('/:userId')
  async removeMember(
    @Param('userId', ParseIntPipe) userId: number,
    @Request() req: any,
  ) {
    return await this.memberService.removeMember(userId, req.headers.projectId);
  }

  @ManagerPermission()
  @Put()
  async updateMember(
    @Body(new AJVValidationPipe(UpdateMembersDto)) data: UpdateMembersDto,
    @Request() req: any,
  ) {
    return await this.memberService.updateMember(data, req.headers.projectId);
  }

  @MemberPermission()
  @Get('/project')
  async getMember(
    @Query(new AJVValidationPipe(GetMembersQuerySchema))
    query: GetMembersQueryDto,
    @Request() req: any,
  ) {
    return await this.memberService.getMembersInProject(
      req.headers.projectId,
      query,
    );
  }

  @UserPermission()
  @Post('/verifyCode')
  async confirmInviteToken(
    @Query(new AJVValidationPipe(VerifyCodeSchema)) query: VerifyCodeDto,
  ) {
    return await this.memberService.confirmInviteToken(query.code);
  }

  @AdminPermission()
  @Get()
  async getMemberInSystem(
    @Query(new AJVValidationPipe(GetMembersQuerySchema))
    query: GetMembersQueryDto,
  ) {
    return await this.memberService.getMembersInSystem(query);
  }
}
