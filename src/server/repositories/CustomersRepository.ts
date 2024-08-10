import { prisma } from "../db";
import { Customer } from "../entities/Customer";

interface CreateCustomerDTO {
  name: string;
  email: string;
  phone: string;
}

export class CustomersRepository {
  async create(data: CreateCustomerDTO): Promise<Customer> {
    return await prisma.customer.create({
      data,
    });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string): Promise<Customer | null> {
    return prisma.customer.findUnique({
      where: {
        id,
      },
    });
  }
}
