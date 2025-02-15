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
    // .nullable(),
  place: z.string({
    required_error: "Required",
  }),
  street: z.string({
    required_error: "Required",
  }),
  state: z.string({
    required_error: "Required",
  }),
  ahv: z.string({
    required_error: "Required",
  }),
  role: z.string({
    required_error: "Required",
  }),
  residenceDate: z
    .date({
      required_error: "Required",
    }),
    // .nullable(),
  residenceType: z.string({
    required_error: "Required",
  }),
  workerType: z.string({
    required_error: "Required",
  }),
  salaryType: z.string({
    required_error: "Required",
  }),
  profilePhoto: z.string().optional(),
  cardFront: z.string().optional(),
  cardBack: z.string().optional(),
  signature: z.string().optional(),
  ahvCard: z.string().optional(),
  notes: z.string({
    required_error: "Required",
  }),
});

export default FormSchemaWorker;
