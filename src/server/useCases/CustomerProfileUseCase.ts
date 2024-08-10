import { Customer } from "../entities/Customer";
import { AppError } from "../error";
import { CustomerRepository } from "../repositories/CustomerRepository";

export class CustomerProfileUseCase {
  constructor(private customersRepository: CustomerRepository) {}
  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not Exists", 404);
    }

    return customer;
  }
}
