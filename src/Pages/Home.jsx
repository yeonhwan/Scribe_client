import React from 'react'
import '../Stylesheets/fonts.css'
import '../index.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useAppStateStore } from '../store/appStateStore';

export default function Home() {
  const navigate = useNavigate();
  const setUserInfo = useAppStateStore((state) => state.setUserInfo);
  const removeUserInfo = useAppStateStore((state) => state.removeUserInfo);
  const setUserLogin = useAppStateStore((state) => state.setUserLogin);
  const setUserIdToken = useAppStateStore((state) => state.setUserIdToken);
  const setLoginDetail = useAppStateStore((state) => state.setLoginDetail);

  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      console.log(tokenResponse);
      const {access_token} = tokenResponse;
      const userData = await axios.post('http://localhost:5862/login', {access_token}); 
      console.log(userData);
      if(userData.data.userIdToken) {
        console.log('user exists');
        const {username, userAvatarUrl, userIdToken} = userData.data;
        setUserIdToken(userIdToken);
        setLoginDetail({username, userAvatarUrl});
        setUserLogin();
        navigate('./listboards');
      } else {
        setUserInfo(userData.data);
        navigate('./login')
      }
    }
  })

  return (
    <div className='w-screen h-screen bg-cover bg-[url("https://images.unsplash.com/photo-1641326038434-01b0217c18f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80")]'>
      <div className='flex w-screen h-screen justify-center bg-[#9896a181] backdrop-blur-lg'>
        <div className='flex my-auto flex-col h-[500px] min-h-[500px] items-center mb-10'>
        {/* logo */}
        <svg width="200" height="200" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className='stroke-[rgb(74,98,205)]' cx="27" cy="27" r="24.5" stroke="#3992A6" strokeWidth="5"/>
          <path className='stroke-[rgb(74,98,205)]' d="M43 11L4.5 24.5L49.5 29.5L9.5 42.5" stroke="#3992A6" strokeWidth="3"/>
        </svg>
        {/* logo */}
        {/* title svg */}
            <svg width="300" height="200" viewBox="0 0 134 71" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path className='fill-[rgb(74,98,205)]' d="M13.3313 52.406C11.282 52.406 9.52265 52.116 8.05331 51.536C6.62265 50.956 5.52065 49.9313 4.74731 48.462C3.97398 46.9927 3.58731 44.924 3.58731 42.256V40.226C4.78598 40.226 5.96531 40.226 7.12531 40.226C8.28531 40.226 9.44531 40.226 10.6053 40.226V42.836C10.6053 44.2667 10.7213 45.3687 10.9533 46.142C11.1853 46.8767 11.514 47.3987 11.9393 47.708C12.3646 47.9787 12.8673 48.114 13.4473 48.114C14.3366 48.114 15.0326 47.8047 15.5353 47.186C16.0766 46.5287 16.3473 45.272 16.3473 43.416C16.3473 41.9853 16.1153 40.922 15.6513 40.226C15.226 39.4913 14.53 38.9113 13.5633 38.486C12.5966 38.022 11.3593 37.4613 9.85131 36.804C8.49798 36.224 7.37665 35.528 6.48731 34.716C5.59798 33.904 4.94065 32.8793 4.51531 31.642C4.08998 30.4047 3.87731 28.8967 3.87731 27.118C3.87731 24.8753 4.16731 23.058 4.74731 21.666C5.36598 20.274 6.37131 19.2687 7.76331 18.65C9.19398 17.9927 11.108 17.664 13.5053 17.664C16.5986 17.664 18.9573 18.3407 20.5813 19.694C22.244 21.0087 23.0753 23 23.0753 25.668V29.786C21.954 29.786 20.8326 29.786 19.7113 29.786C18.6286 29.786 17.5073 29.786 16.3473 29.786V27.698C16.3473 25.958 16.1346 24.74 15.7093 24.044C15.3226 23.348 14.6073 23 13.5633 23C12.558 23 11.8426 23.3093 11.4173 23.928C10.992 24.5467 10.7793 25.552 10.7793 26.944C10.7793 28.22 11.0306 29.2253 11.5333 29.96C12.0746 30.656 12.7513 31.1973 13.5633 31.584C14.3753 31.932 15.2453 32.28 16.1733 32.628C17.8746 33.2853 19.2666 33.962 20.3493 34.658C21.432 35.3153 22.2246 36.2433 22.7273 37.442C23.23 38.602 23.4813 40.284 23.4813 42.488C23.4813 44.9627 23.056 46.9347 22.2053 48.404C21.3933 49.8347 20.214 50.8593 18.6673 51.478C17.1593 52.0967 15.3806 52.406 13.3313 52.406ZM36.5676 52.696C34.6729 52.696 32.9909 52.464 31.5216 52C30.0909 51.5747 28.9502 50.666 28.0996 49.274C27.2876 47.8433 26.8816 45.736 26.8816 42.952V24.972C26.8816 22.9227 27.2876 21.3373 28.0996 20.216C28.9502 19.0947 30.1102 18.3213 31.5796 17.896C33.0489 17.432 34.7309 17.2 36.6256 17.2C38.5589 17.2 40.2216 17.432 41.6136 17.896C43.0442 18.36 44.1462 19.1527 44.9196 20.274C45.6929 21.3953 46.0796 22.9613 46.0796 24.972V32.048H39.3516V24.682C39.3516 23.754 39.2356 23.058 39.0036 22.594C38.7716 22.0913 38.4429 21.7627 38.0176 21.608C37.6309 21.4533 37.1669 21.376 36.6256 21.376C36.0842 21.376 35.6009 21.4533 35.1756 21.608C34.7502 21.7627 34.4216 22.0913 34.1896 22.594C33.9576 23.058 33.8416 23.754 33.8416 24.682V45.446C33.8416 46.3353 33.9576 47.0313 34.1896 47.534C34.4216 47.998 34.7502 48.3267 35.1756 48.52C35.6009 48.6747 36.0842 48.752 36.6256 48.752C37.1669 48.752 37.6309 48.6747 38.0176 48.52C38.4429 48.3267 38.7716 47.998 39.0036 47.534C39.2356 47.0313 39.3516 46.3353 39.3516 45.446V38.66H46.0796V42.894C46.0796 45.7167 45.6929 47.8433 44.9196 49.274C44.1462 50.666 43.0442 51.5747 41.6136 52C40.2216 52.464 38.5396 52.696 36.5676 52.696ZM50.3403 52V17.722H62.8683C65.1496 17.722 66.8703 18.244 68.0303 19.288C69.1903 20.2933 69.7703 21.7047 69.7703 23.522V28.858C69.7703 30.6753 69.287 32.2027 68.3203 33.44C67.3536 34.6773 65.8456 35.3927 63.7963 35.586C65.111 35.7793 66.039 36.224 66.5803 36.92C67.1603 37.5773 67.663 38.66 68.0883 40.168L71.3363 52H63.8543L61.3603 40.632C61.1283 39.704 60.8576 38.9307 60.5483 38.312C60.2776 37.6547 59.8716 37.326 59.3303 37.326H57.3583V52H50.3403ZM57.3583 32.628H60.1423C61.225 32.628 61.9983 32.338 62.4623 31.758C62.9263 31.1393 63.1583 30.1727 63.1583 28.858V24.74C63.1583 23.5027 62.9456 22.6327 62.5203 22.13C62.095 21.6273 61.4376 21.376 60.5483 21.376H57.3583V32.628ZM74.6958 52V17.722H81.4238V52H74.6958ZM86.3071 52V17.722H98.4871C100.652 17.722 102.296 18.244 103.417 19.288C104.577 20.2933 105.157 21.7047 105.157 23.522V27.408C105.157 28.4133 105.002 29.3413 104.693 30.192C104.422 31.004 103.997 31.7 103.417 32.28C102.992 32.7053 102.45 33.034 101.793 33.266C101.136 33.498 100.498 33.6333 99.8791 33.672V33.73C100.536 33.73 101.174 33.8073 101.793 33.962C102.412 34.1167 102.992 34.426 103.533 34.89C104.19 35.3927 104.712 36.0887 105.099 36.978C105.486 37.8287 105.679 38.892 105.679 40.168V44.866C105.679 46.722 105.35 48.172 104.693 49.216C104.074 50.26 103.166 50.9947 101.967 51.42C100.807 51.8067 99.4151 52 97.7911 52H86.3071ZM93.0931 48.462H96.2251C96.8051 48.462 97.2691 48.3653 97.6171 48.172C98.0038 47.94 98.2938 47.534 98.4871 46.954C98.7191 46.374 98.8351 45.5233 98.8351 44.402V40.342C98.8351 38.7953 98.5644 37.79 98.0231 37.326C97.5204 36.8233 96.8438 36.572 95.9931 36.572H93.0931V48.462ZM93.0931 32.338H95.8191C96.7084 32.338 97.4044 32.0287 97.9071 31.41C98.4484 30.7913 98.7191 29.7087 98.7191 28.162V24.74C98.7191 23.5413 98.4871 22.6907 98.0231 22.188C97.5978 21.6467 97.0371 21.376 96.3411 21.376H93.0931V32.338ZM109.87 52V17.722H125.646V22.478H116.888V31.642H124.312V36.92H116.888V47.36H125.646V52H109.87Z" fill="#3992A6"/>
              <path className='fill-[rgb(34,65,124)]' d="M129 56.5L127.61 52L131.105 52L129 56.5Z" fill="#1A4A55"/>
              <path className='fill-[rgb(34,65,124)]' d="M29.5264 60.5L128.855 56.3943L129.38 56.926L32.6843 65L29.5264 60.5Z" fill="#1A4A55"/>
              <path className='fill-[rgb(74,98,205)]' d="M129.527 27H133.211L131.106 52H127.61L129.527 27Z" fill="#3992A6"/>
            </svg>
        {/* title svg */}
        </div>
        <div className='flex flex-col justify-center h-[500px] min-h-[500px] w-100 bg-primary-lighter ml-10 my-32 px-10 pb-10 rounded-2xl'>
          <div className='flex flex-col items-center mb-8'>
            <h2 className='mt-4 pb-4 pt-4 text-slate-300 font-light text-md'>Make a your own lists. <br/> Fill it with your things to do. <br/> Scribe it out when its done!</h2>
            <div className='border-b-2 mb-4 rounded-full w-1/4 border-[rgb(54,70,144)]'></div>
          </div>
          <div className='flex flex-col items-center mb-14'>
              <h2 className='text-4xl tracking-wider font-anton font-bold text-[rgb(82,109,227)]'>SCRIBE</h2>
              <h2 className='ml-2 pt-1.5 font-semibold text-[rgb(51,68,143)] text-md'> Simple Todolist Webapp </h2>
          </div>
          <div className='flex flex-col items-center'>
              <div onClick={()=>{login()}} className='flex bg-sky-700 rounded-full items-center hover:cursor-pointer hover:bg-blue-600 drop-shadow-lg'>
                <div className='p-0.5 mx-2 bg-white rounded-full justify-items-start'>
                  <img className='w-8 h-8' src='/public/google_logo.png'/>
                  </div>
                  <span className='text-sm ml-4 py-4 mr-7'>Sigin in with Google</span>
              </div>
              <div className='flex bg-[rgb(80,87,122)] px-10 py-3 rounded-full mt-4 justify-center hover:cursor-pointer hover:bg-green-600 drop-shadow-lg'>
              <Link to={'./simple'} className='bg-transparent text-md'>use it without sign in</Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}
