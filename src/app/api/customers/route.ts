import { CustomersRepository } from "../../../server/repositories/CustomersRepository";
import { CreateCustomerUseCase } from "../../../server/useCases/CreateCustomerUseCase";
import { CustomerSchema } from "../../../server/entities/Customer";
import { ZodError } from "zod";

const customersRepository = new CustomersRepository();
const createCustomerUseCase = new CreateCustomerUseCase(customersRepository);

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const customer = await createCustomerUseCase.execute(
      CustomerSchema.parse(data)
    );

    return Response.json(customer, { status: 200 });
  } catch (err: any) {
    return Response.json(
      {
        message: err instanceof ZodError ? err.issues[0].message : err.message,
      },
      {
        status: err.status || 400,
      }
    );
  }
}
