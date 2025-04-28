import { z } from "zod";

const FormSchemaWorker = z.object({
  name: z.string({
    required_error: "Required",
  }),
  phoneNumber: z.string({
    required_error: "Required",
  }),
  email: z.string({
    required_error: "Required",
  }),
  password: z.string({
    required_error: "Required",
  }),
  birthDate: z
    .date({
      required_error: "Required",
    }),
  role: z.string({
    required_error: "Required",
  }),
  // profilePhoto: z.string().optional(),
});

export default FormSchemaWorker;
