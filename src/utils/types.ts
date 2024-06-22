import { LucideIcon } from "lucide-react";
import { userRole } from "../types/usertype";
export interface CardData {
  id: string;
  category: string;
  title: string;
  pointOfInterest: number;
  backgroundColor: string;
}

export interface iLogistic {
  price: number;
  name: string;
  status: boolean;
  tracking_number: string;
  descriptions?: {
    name?: string;
    avatarPublicId?: string;
    imgUrl?: string;
  }[];
}
export type logisticsResponse = {
  tasks: iLogistic[];
};
export interface userRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: userRole;
  phoneNumber: string;
}
export interface user
  extends Omit<userRegister, "password" | "confirmPassword"> {
  role: "user" | "admin" | "employee";
  _id: number;
  userId: number;
  isVerified: boolean;
  total: number;
  percent: number;
}
export interface iPDFDocument {
  _id: string;
  createdBy: {
    readonly userId: number;
    user: any;
  };
  readonly originalFile: string;
  currentFile: string;
  edits: string[];
  employeeIds: number[];
  storedFileName: string;
  status: "uploaded" | "in-progress" | "completed";
  employeeNames: {
    fullname: string;
    userId: number;
  }[];
  createdAt: string
}
export interface iEdit {
  readonly pdfId: string;
  readonly employeeId: number;
  readonly previousFile: string;
  readonly newFile: string;
  readonly editSummary?: string;
  createdAt: string;
  employee: {
    fullname: string;
    userId: string;
  };
}
export interface iPDFDocumentResponse {
  pdfDocuments: iPDFDocument;
  edits: iEdit;
}
export interface iStat {
  title: string;
  count: number;
  icon: LucideIcon;
  className?: string;
}
[];
type Type = {
  [key in "uploaded" | "in-progress" | "completed"]: number;
};
export interface defaultStats {
  inprogress: number,
  completed: number,
  uploaded: number,
};
