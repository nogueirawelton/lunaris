import { prisma } from "../db";
import { Lead } from "../entities/Lead";

interface CreateLeadDTO {
  customerId: string;
  data: string;
}

export class LeadsRepository {
  async create({ customerId, data }: CreateLeadDTO): Promise<Lead> {
    return await prisma.lead.create({
      data: {
        data: data,
        customer: {
          connect: { id: customerId },
        },
      },
    });
  }
}
