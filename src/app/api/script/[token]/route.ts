import jwt from "jsonwebtoken";

export async function GET(
  _: Request,
  { params }: { params: { token: string } }
) {
  try {
    const isValid = jwt.verify(params.token, process.env.SIGNED_WORD!);
    return new Response("console.log('funcionou')");
  } catch (err) {
    return new Response("console.log('Token inválido')");
  }
}
