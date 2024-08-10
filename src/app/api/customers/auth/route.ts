import { CustomerRepository } from "@/server/repositories/CustomerRepository";
import { AuthCustomerScriptUseCase } from "@/server/useCases/AuthCustomerScriptUseCase";

const customersRepository = new CustomerRepository();
const authCustomerScriptUseCase = new AuthCustomerScriptUseCase(
  customersRepository
);

export async function POST(request: Request) {
  const { customerId } = await request.json();

  try {
    const customer = await authCustomerScriptUseCase.execute(customerId);

    return Response.json(customer, { status: 200 });
  } catch (err: any) {
    return Response.json(
      {
        message: err.message,
      },
      {
        status: err.statusCode,
      }
    );
  }
}
