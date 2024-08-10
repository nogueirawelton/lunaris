import jwt from "jsonwebtoken";

import { AppError } from "../error";
import { CustomersRepository } from "../repositories/CustomersRepository";
import { Customer } from "../entities/Customer";

export class ValidateScriptTokenUseCase {
  constructor(private customersRepository: CustomersRepository) {}
  async execute(token: string | undefined): Promise<Customer> {
    if (!token) {
      throw new AppError("Invalid Token", 401);
    }

    const { id }: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer Not Exists", 404);
    }

    if (!customer.isActive) {
      throw new AppError("Inactive Customer", 401);
    }

    return customer;
  }
}
