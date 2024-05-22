import { checkForProduction } from "./checkForProduction";

export const BASE_URL = !checkForProduction
  ? `${import.meta.env.VITE_APP_dev_server_url}`
  : `${import.meta.env.VITE_APP_prod_server_url}`;

export const APP_NAME=`${import.meta.env.VITE_APP_APP_NAME}`
export const phone_number=`${import.meta.env.VITE_APP_phone_number}`