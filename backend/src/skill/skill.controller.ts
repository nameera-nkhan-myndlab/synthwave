import { Controller, Get, Post, Delete, Body, Param, ParseIntPipe, HttpCode } from '@nestjs/common';
import { SkillService } from './skill.service';
import { CreateSkillDto } from './dto/create-skill.dto';

@Controller('skills')
export class SkillController {
  constructor(private readonly svc: SkillService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  create(@Body() dto: CreateSkillDto) { return this.svc.create(dto); }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) { return this.svc.remove(id); }
}