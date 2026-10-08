import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectRepository(ContactMessage) private repo: Repository<ContactMessage>) {}

  findAll(): Promise<ContactMessage[]> { return this.repo.find({ order: { createdAt: 'DESC' } }); }

  async create(dto: CreateContactDto): Promise<ContactMessage> {
    const msg = this.repo.create(dto);
    return this.repo.save(msg);
  }
}