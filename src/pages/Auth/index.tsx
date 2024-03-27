import { lazy } from "react";
const Login = lazy(() => import("./Login.js"));
const Register = lazy(() => import("./Register.js"))
export { default as AuthLayout } from "./AuthLayout.js"
export {
    Login,
    Register
}