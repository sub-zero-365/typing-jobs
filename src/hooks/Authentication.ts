import { useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser, setUser as setLoginUser } from "../actions/userSlice.js";
import customFetch from "../utils/customFetch.js";

export default function useAuthenticalUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const loginUser = async () => {
    try {
      const { data } = await customFetch.get("/users/current-user");
      const { user } = data;
      dispatch(setLoginUser(user));
    } catch (err) {
      //do nothing here
    }
  };
  const logOut = async (error: string = "") => {
    try {
      await customFetch.get("/auth/logout");
      navigate("/home/auth?message=" + error);
      dispatch(removeUser());
      await queryClient.removeQueries();
    } catch (err) {
      alert("fail to logout !!!");
      console.log("this is the fail response here", err.response?.data);
    }
  };
  return {
    loginUser,
    logOut,
  };
}
