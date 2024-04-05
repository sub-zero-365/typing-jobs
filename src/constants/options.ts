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
