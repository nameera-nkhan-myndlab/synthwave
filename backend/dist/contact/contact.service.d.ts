import { Repository } from 'typeorm';
import { ContactMessage } from './contact-message.entity';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactService {
    private repo;
    constructor(repo: Repository<ContactMessage>);
    findAll(): Promise<ContactMessage[]>;
    create(dto: CreateContactDto): Promise<ContactMessage>;
}
