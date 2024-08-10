import path from "path";
import fs from "fs";

import { CustomersRepository } from "@/server/repositories/CustomersRepository";
import { AuthCustomerScriptUseCase } from "@/server/useCases/AuthCustomerScriptUseCase";
import { ValidateScriptTokenUseCase } from "@/server/useCases/ValidateScriptTokenUseCase";
import { cookies } from "next/headers";

const customersRepository = new CustomersRepository();
const validateScriptTokenUseCase = new ValidateScriptTokenUseCase(
  customersRepository
);
const authCustomerScriptUseCase = new AuthCustomerScriptUseCase(
  customersRepository
);

export async function GET(_: Request) {
  try {
    const token = cookies().get("SOLARIS_SCRIPT_TOKEN");
    await validateScriptTokenUseCase.execute(token?.value);

    const filePath = path.join(process.cwd(), "lunaris.js");
    const fileContent = fs.readFileSync(filePath, "utf8");

    return new Response(fileContent);
  } catch (err: any) {
    return new Response(`console.error('Solaris Error:', '${err.message}')`);
  }
}

export async function POST(request: Request) {
  const { customerId } = await request.json();

  try {
    const token = await authCustomerScriptUseCase.execute(customerId);
    const response = new Response();

    response.headers.append(
      "Set-Cookie",
      `SOLARIS_SCRIPT_TOKEN=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${
        60 * 60
      }`
    );

    return response;
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
