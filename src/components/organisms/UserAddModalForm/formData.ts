import z from "zod";
import FormSchemaNewWorker from "./FormSchemaUser";

export const formData = ({
  values,
  photos,
}: {
  values: z.infer<typeof FormSchemaNewWorker>;
  photos: { [key: string]: string | null };
}) => {
  const {
    name,
    email,
    password,
    birthDate,
    phoneNumber,
    place,
    street,
    state,
    ahv,
    role,
    residenceDate,
    residenceType,
    workerType,
    salaryType,
    notes,
  } = values;

  const dataObject: Record<string, string | null | undefined> = {
    name,
    email,
    password,
    birthDate: birthDate?.toISOString(),
    phoneNumber,
    place,
    street,
    state,
    ahv,
    role,
    residenceDate: residenceDate?.toISOString(),
    residenceType,
    workerType,
    salaryType,
    notes,
  };

  Object.keys(photos).forEach((key) => {
    if (photos[key]) {
      dataObject[key] = photos[key];
    }
  });

  return dataObject;
};
