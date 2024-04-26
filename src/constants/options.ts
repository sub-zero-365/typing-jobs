import dayjs from "dayjs";
import { USER_ROLES } from "../types/usertype";

export const statusOptions: readonly {
  value: string;
  label: "pending" | "sent" | "recieved";
}[] = [
  {
    value: "pending",
    label: "pending",
  },
  {
    value: "sent",
    label: "sent",
  },
  {
    value: "recieved",
    label: "recieved",
  },
];
export const dateSortedOptions: readonly {
  value: string;
  label: string;
}[] = [
  {
    label: "today",
    value: dayjs().format("DD/MM/YYYY"),
  },
  {
    label: "1 week",
    value: dayjs().add(7, "day").format("DD/MM/YYYY"),
  },
  {
    label: "1month",
    value: dayjs().add(1, "month").format("DD/MM/YYYY"),
  },
  {
    label: "1year",
    value: dayjs().add(12, "month").format("DD/MM/YYYY"),
  },
];
export const usersoptions = Object.values(USER_ROLES).map((w) => ({
  value: w,
  label: w,
}));

