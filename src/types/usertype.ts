export type userRole = "admin" | "user" | "moderator" |'employee';
interface iuser{ [key: string | number]: userRole }
export const USER_ROLES:iuser = 
  {
    admin: "admin",
    employee: "employee",
    user: "user",
  }
 

