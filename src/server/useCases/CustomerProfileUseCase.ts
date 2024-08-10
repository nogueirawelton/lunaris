import { Customer } from "../entities/Customer";
import { AppError } from "../error";
import { CustomersRepository } from "../repositories/CustomersRepository";

export class CustomerProfileUseCase {
  constructor(private customersRepository: CustomersRepository) {}
  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer Not Exists", 404);
    }

    return customer;
  }
}
