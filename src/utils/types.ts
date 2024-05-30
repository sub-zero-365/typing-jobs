import { userRole } from "../types/usertype";

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
  role: "user" | "admin";
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
}
export interface iEdit {
  readonly pdfId: string;
  readonly employeeId: number;
  readonly previousFile: string;
  readonly newFile: string;
  readonly editSummary?: string;
  createdAt: string;
  employee: {
    fullname: string,
    userId: string,
  },
}
export interface iPDFDocumentResponse {
  pdfDocuments: iPDFDocument;
  edits: iEdit;
}
