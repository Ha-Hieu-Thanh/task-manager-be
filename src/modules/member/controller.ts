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
} from '@nestjs/common';
import {
  AdminPermission,
  MemberPermission,
} from '@shared/decorators/permission.decorator';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import { GetMembersQueryDto, InviteMembersDto, UpdateMembersDto } from './dto';
import { GetMembersQuerySchema } from './validation';

// check pm
@Controller('member')
export class MemberController {
  @MemberPermission()
  @Post('/invite')
  async inviteMember(
    @Body(new AJVValidationPipe(InviteMembersDto)) data: InviteMembersDto,
  ) {}

  @MemberPermission()
  @Delete('/:id')
  async removeMember(@Param('id', ParseIntPipe) id: number) {}

  @MemberPermission()
  @Put()
  async updateMember(
    @Body(new AJVValidationPipe(UpdateMembersDto)) data: UpdateMembersDto,
  ) {}

  @MemberPermission()
  @Get()
  async getMember(
    @Query(new AJVValidationPipe(GetMembersQuerySchema))
    query: GetMembersQueryDto,
  ) {}
}
