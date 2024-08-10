import jwt from "jsonwebtoken";

import { AppError } from "../error";
import { CustomerRepository } from "../repositories/CustomerRepository";

export class AuthCustomerScriptUseCase {
  constructor(private customersRepository: CustomerRepository) {}
  async execute(id: string): Promise<{
    token: string;
  }> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("Customer not Exists", 404);
    }

    const token = jwt.sign({}, process.env.SIGNED_WORD!, { expiresIn: "1h" });

    return {
      token,
    };
  }
}
