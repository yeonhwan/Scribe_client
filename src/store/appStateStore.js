import create from "zustand";
import produce from "immer";


export const useAppStateStore = create((set) => ({
  appState: {
    navbarOpen : false,
    theme : 'dark',
  },

  navbarToggle : (isOpen) => set(
    produce((state) => {
      console.log('mouse over')
      state.appState.navbarOpen = isOpen;
      console.log('mouse over', state.appState.navbarOpen);
    }))
}))