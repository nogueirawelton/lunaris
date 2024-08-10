import { z } from "zod";

export const CustomerSchema = z.object({
  email: z
    .string({ required_error: "Email cannot be null" })
    .email("Invalid email"),
  phone: z
    .string({ required_error: "Phone cannot be null" })
    .min(15, "Invalid phone"),
  name: z
    .string({ required_error: "Name cannot be null" })
    .min(3, "Invalid name"),
});

export interface Customer extends z.infer<typeof CustomerSchema> {
  id: string;
  // leads: Lead[];
  createdAt: Date;
  updatedAt: Date;
}
