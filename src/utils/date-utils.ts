import { format } from "date-fns";

export const formatDate = (date: string) => {
  return format(new Date(date), "dd.MM.yyyy");
};

export const formatHour = (date: string) => {
  return format(new Date(date), "HH.MM");
};
