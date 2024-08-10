import { CustomerRepository } from "@/server/repositories/CustomerRepository";
import { CustomerProfileUseCase } from "@/server/useCases/CustomerProfileUseCase";

const customersRepository = new CustomerRepository();
const getCustomerUseCase = new CustomerProfileUseCase(customersRepository);

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const customer = await getCustomerUseCase.execute(params.id);

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
