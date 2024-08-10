import jwt from "jsonwebtoken";

import { AppError } from "../error";
import { CustomersRepository } from "../repositories/CustomersRepository";

export class AuthCustomerScriptUseCase {
  constructor(private customersRepository: CustomersRepository) {}
  async execute(id: string): Promise<string> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer Not Exists", 404);
    }

    const token = jwt.sign(
      {
        id,
      },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: "1h" }
    );

    return token;
  }
}
