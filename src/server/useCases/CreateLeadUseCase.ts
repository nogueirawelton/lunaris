import { Customer } from "../entities/Customer";
import { Lead } from "../entities/Lead";
import { LeadsRepository } from "../repositories/LeadsRepository";

interface Request {
  data: string;
  customer: Customer;
}

export class CreateLeadUseCase {
  constructor(private leadsRepository: LeadsRepository) {}
  async execute({ customer, data }: Request): Promise<Lead> {
    const lead = await this.leadsRepository.create({
      customerId: customer.id,
      data,
    });

    return lead;
  }
}
