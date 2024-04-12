import { createSlice } from '@reduxjs/toolkit';
type iThemeState = {
  currentTheme: 'light' | 'dark';
};
const checkDefaultTheme = (): boolean => {
  const isDarkTheme = localStorage.getItem('darkTheme') === 'true' || !(window.matchMedia('(prefers-color-scheme: dark)').matches)
  if(isDarkTheme){
        document.documentElement.classList.add('dark');
    }
  return isDarkTheme;
};

const isDarkThemeEnabled = checkDefaultTheme();

const initialState: iThemeState = {
  currentTheme: !isDarkThemeEnabled ? 'light' : 'dark', // Initial theme
};
const toggleDarkTheme = (currentTheme: iThemeState['currentTheme']) => {
  const newDarkTheme = currentTheme == 'dark';

  document.documentElement.classList.toggle('dark', newDarkTheme);
  localStorage.setItem('darkTheme', String(newDarkTheme));
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      state.currentTheme = state.currentTheme === 'light' ? 'dark' : 'light';
      toggleDarkTheme(state.currentTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice;
