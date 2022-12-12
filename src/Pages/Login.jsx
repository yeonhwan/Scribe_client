import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useAppStateStore } from "../store/appStateStore";

export default function Login() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [userProfileUrlInput, setUserProfileUrlInput] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const removeUserInfo = useAppStateStore((state) => state.removeUserInfo);
  const setUserLogin = useAppStateStore((state) => state.setUserLogin);
  const setUserIdToken = useAppStateStore((state) => state.setUserIdToken);
  const setLoginDetail = useAppStateStore((state) => state.setLoginDetail);

  useEffect(() => {
    setUserInfo(useAppStateStore.getState().userInfo);
    console.log('checking data', useAppStateStore.getState().userInfo);
  },[])

  const configureLoginAndNavigate = (data) => {
    console.log('accepted userIdToekn', data.data);
    const {username, userAvatarUrl, userIdToken} = data.data;
    setUserIdToken(userIdToken);
    console.log('id Token is...', useAppStateStore.getState().userIdToken);
    setUserLogin();
    removeUserInfo();
    setLoginDetail({username, userAvatarUrl});
    navigate('/listboards')
  }

  const sendingNewUserData = () => {
    return axios.post('http://localhost:5862/newuser', {userData : {username : usernameInput, avatarUrl : userProfileUrlInput, userID : userInfo?.email}});
  }
  const {mutate : addNewUser} = useMutation({mutationKey : 'addingNewUser', mutationFn : sendingNewUserData, onSuccess : configureLoginAndNavigate})


  return (
    <div className='aboslute z-0 w-screen h-screen bg-cover bg-[url("https://images.unsplash.com/photo-1641326038434-01b0217c18f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80")]'>
      <div className="bg-neutral-600/40 backdrop-blur-md w-full h-full flex justify-center items-center">
        <div className="flex flex-col w-[400px] h-[550px] bg-neutral-900/80 rounded-xl">
          <div className="mx-auto mt-5">
            {/* logo */}
            <svg className="" width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className='stroke-primary' cx="27" cy="27" r="24.5" stroke="#3992A6" strokeWidth="5"/>
              <path className='stroke-primary' d="M43 11L4.5 24.5L49.5 29.5L9.5 42.5" stroke="#3992A6" strokeWidth="3"/>
            </svg>
          </div>
            <p className="text-lg font-bold mt-2 mb-4 text-primary">SCRIBE</p>
            <p className="text-2xl font-bold mb-2">{`Welcome, ${userInfo?.name}!`}</p>
            <p className="text-xs font-semibold mb-6">Please set few information before you proceed</p>
            <div className="w-2/5 mx-auto border-b-2 mb-1 border-secondary-lighter"></div>
            <div className="flex flex-col items-center justify-center mx-auto mt-4 w-3/5">
              <p className="text-sm mb-6 font-bold">{`User ID : ${userInfo?.email}`}</p>
              <label className="mb-1 font-bold">Username</label>
              <input onChange={(e) => {setUsernameInput(e.target.value)}} value={usernameInput} placeholder="username" className="pl-2 w-40 rounded-lg mb-4"></input>
              <label className="mb-1 font-bold">Choose your profile image (url)</label>
              <input onChange={(e) => {setUserProfileUrlInput(e.target.value)}} value={userProfileUrlInput} placeholder="www.example.com/image" className="pl-2 w-60 rounded-lg mb-4"></input>
            </div>
          <div className="flex mx-auto mt-12">
            <button onClick={addNewUser} className="w-20 bg-green-600 hover:bg-primary">Save</button>
            <button onClick={() => {navigate('/')}} className="w-20 ml-4 bg-amber-900 hover:bg-red-500">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
