import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly svc: ContactService) {}

  @Get()
  findAll() { return this.svc.findAll(); }

  @Post()
  create(@Body() dto: CreateContactDto) { return this.svc.create(dto); }
}