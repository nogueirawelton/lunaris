import { Customer } from "../entities/Customer";
import { CustomerRepository } from "../repositories/CustomerRepository";
import { AppError } from "../error";

interface Request {
  name: string;
  email: string;
  phone: string;
}

export class CreateCustomerUseCase {
  constructor(private customersRepository: CustomerRepository) {}
  async execute({ name, email, phone }: Request): Promise<Customer> {
    const customerAlreadyExists = await this.customersRepository.findByEmail(
      email
    );

    if (customerAlreadyExists) {
      throw new AppError("Customer Already Exists!");
    }

    const customer = await this.customersRepository.create({
      name,
      email,
      phone,
    });

    return customer;
  }
}
