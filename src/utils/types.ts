export interface iLogistic {
  price: number;
  name: string;
  tracking_number: string;
  status: boolean;
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

}
