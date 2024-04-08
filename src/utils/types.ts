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
  logistics: iLogistic[];
};
export interface userRegister {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface user
  extends Omit<userRegister, "password" | "confirmPassword"> {
  role: "user" | "admin";
  _id: number;
  userId: number;
  isVerified: boolean;
  total:number,
  percent:number
}
