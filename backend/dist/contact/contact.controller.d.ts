import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
export declare class ContactController {
    private readonly svc;
    constructor(svc: ContactService);
    findAll(): Promise<import("./contact-message.entity").ContactMessage[]>;
    create(dto: CreateContactDto): Promise<import("./contact-message.entity").ContactMessage>;
}
