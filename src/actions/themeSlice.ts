import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store.js";
// import { reducer } from "../components/ui/use-toast.js";

export type tTheme = {
  theme: "light" | "dark";
};
const checkDefaultTheme = (): tTheme => {
  const theme = localStorage.getItem("theme") === "light" ? "light" : "dark";
  document.body.classList.add(theme);
  return {theme};
};
const initialState: tTheme = checkDefaultTheme();

export const themeSlice = createSlice({
  name: "theme",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setActionTheme: (state, action: PayloadAction<"light"|"dark">) => {
      state.theme = action.payload ?? "light";
    
      document.documentElement.className = "";
      document.documentElement.classList.add(action.payload);
      document.documentElement.setAttribute("data-theme", action.payload);
      localStorage.setItem("theme", action.payload);
    },
    getCurrentTheme: (state) => state,
  },
});

export const { setActionTheme, getCurrentTheme } = themeSlice.actions;
// export const getUserState = (state: RootState) => state;
export default themeSlice.reducer;
