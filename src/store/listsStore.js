import create from "zustand";
import produce from "immer";
import axios from "axios";


export const useUserDatasStore = create((set) => (
  {
  userData : {},

  fetchUserData : async (userId) => {
    const userInfo = (await axios.post('http://localhost:5862/userinfo', {userId}))?.data.userData;
    set(produce((state) => {
      state.userData = userInfo;
      // console.log(state.userData)
    }))
  }

  }
))