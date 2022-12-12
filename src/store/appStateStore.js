import create from "zustand";
import produce from "immer";
import { persist } from "zustand/middleware"

export const useAppStateStore = create(persist((set) => ({
  appState: {
    userInfo : {},
    loginDetail : {},
    userLogin : false,
    userIdToken : null,
  },

  setLoginDetail : (detail) => set(
    produce((state) => {
      state.loginDetail = detail;
      console.log(state.loginDetail);
    }))
  ,
  setUserInfo : (user) => set(
    produce((state) => {
      state.userInfo = user;
      console.log('saving states', state.userInfo);
  })),
  removeUserInfo : () => set(
    produce((state) => {
      state.userInfo = {};
    })),
  removeLoginDetail : () => set(
    produce((state) => {
      state.loginDetail = {};
  }))
    ,
  setUserLogin : () => set(
    produce((state) => {
      state.userLogin = true;
    })),
  setUserLogout : () => set(
    produce((state) => {
      state.userLogin = false;
    })),
  setUserIdToken : (userId) => set(
    produce((state) => {
      state.userIdToken = userId;
      console.log('setting userIdToken', state.userIdToken);
    })),
  removeUserIdToken : () => set(
    produce((state) => {
      state.userIdToken = null;
  })),
  navbarToggle : (isOpen) => set(
    produce((state) => {
      state.appState.navbarOpen = isOpen;
    }))
})),
{
  name : 'app-storage',
  getStorage: () => sessionStorage,
})