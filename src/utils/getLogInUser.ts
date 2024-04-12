import { useSelector } from "react-redux";
import { RootState } from "../store/store.js";
const useGetLoginUser = ()=> {
  const user = useSelector((state:RootState) => state.user.user);
  
  return user;
};
export default useGetLoginUser;
