import z from "zod";
import FormSchemaNewWorker from "./FormSchemaUser";

export const formData = ({
  values,
  // photos,
}: {
  values: z.infer<typeof FormSchemaNewWorker>;
  // photos: { [key: string]: string | null };
}) => {
  const {
    name,
    email,
    password,
    birthDate,
    phoneNumber,
    role,
  } = values;

  const dataObject: Record<string, string | null | undefined> = {
    name,
    email,
    password,
    birthDate: birthDate?.toISOString(),
    phoneNumber,
    role,
  };

  // Object.keys(photos).forEach((key) => {
  //   if (photos[key]) {
  //     dataObject[key] = photos[key];
  //   }
  // });

  return dataObject;
};
