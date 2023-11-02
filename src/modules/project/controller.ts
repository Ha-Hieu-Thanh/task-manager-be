import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './service';
import { CreateProjectSchema, UpdateProjectSchema } from './validation';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { AJVValidationPipe } from '@shared/pipes/AJVValidationPipe';
import {
  AdminPermission,
  MemberPermission,
} from '@shared/decorators/permission.decorator';
import { User } from '@shared/decorators/user.decorator';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @AdminPermission()
  @Post()
  async createProject(
    @Body(new AJVValidationPipe(CreateProjectSchema)) data: CreateProjectDto,
  ) {
    const newProject = await this.projectService.createProject(data);
    return newProject;
  }

  @AdminPermission()
  @Put()
  async updateProject(
    @Body(new AJVValidationPipe(UpdateProjectSchema)) data: UpdateProjectDto,
  ) {
    const updatedProject = await this.projectService.updateProject(data);
    return updatedProject;
  }

  @AdminPermission()
  @Delete('/:id')
  async deleteProject(@Param('id', ParseIntPipe) id: number) {
    const isDeleted = await this.projectService.deleteProject(id);
    return isDeleted;
  }

  @MemberPermission()
  @Get('/me')
  async getMemberProjects(@User('userId') userId: number) {
    const projects = await this.projectService.getMemberProjects(userId);
    return projects;
  }

  @AdminPermission()
  @Get('/all')
  async getAllProjects() {
    const projects = await this.projectService.getAllProjects();
    return projects;
  }
}
