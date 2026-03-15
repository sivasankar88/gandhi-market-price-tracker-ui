import { format, subDays } from "date-fns";

export const dateSubraction = (n: number) => {
  const subractedDate = subDays(new Date(), n);
  return format(subractedDate, "MM/dd/yyyy");
};
