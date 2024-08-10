import { ZodError } from "zod";
import { LeadsRepository } from "@/server/repositories/LeadsRepository";
import { CreateLeadUseCase } from "@/server/useCases/CreateLeadUseCase";
import { cookies } from "next/headers";
import { ValidateScriptTokenUseCase } from "@/server/useCases/ValidateScriptTokenUseCase";
import { CustomersRepository } from "@/server/repositories/CustomersRepository";

const leadsRepository = new LeadsRepository();
const customersRepository = new CustomersRepository();

const createLeadUseCase = new CreateLeadUseCase(leadsRepository);
const validateScriptTokenUseCase = new ValidateScriptTokenUseCase(
  customersRepository
);

export async function POST(request: Request) {
  const { data } = await request.json();

  try {
    const token = cookies().get("SOLARIS_SCRIPT_TOKEN");
    const customer = await validateScriptTokenUseCase.execute(token?.value);

    const lead = await createLeadUseCase.execute({
      customer,
      data: JSON.stringify(data),
    });

    return Response.json(lead, { status: 200 });
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
