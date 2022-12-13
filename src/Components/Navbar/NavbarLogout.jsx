import { useState } from "react";
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function NavbarOpened() {
  const [alertClosed, setAlertClosed] = useState(false);

  const navigate = useNavigate();



  return (
    <div className="flex w-screen h-screen">
      <div className=" bg-transparent top w-full absolute z-10">
        <div className="flex items-center">
          <Link to={'/'}>
            <div className="flex items-center ml-4">
            <svg className="mt-3.5" width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className='stroke-[rgb(74,98,205)]' cx="27" cy="27" r="24.5" stroke="#3992A6" strokeWidth="5"/>
              <path className='stroke-[rgb(74,98,205)]' d="M43 11L4.5 24.5L49.5 29.5L9.5 42.5" stroke="#3992A6" strokeWidth="3"/>
            </svg>
            <h1 className="ml-2 pt-4 text-xl font-semibold">SCRIBE</h1>
            </div>
          </Link>
          <button onClick={()=>{navigate('/')}} className="text-primary border border-primary pb-6 px-4 h-6 mt-[11px] ml-4 hover:bg-primary hover:text-white">Login</button>
        </div>
      </div>
      <div className={`flex justify-center items-center w-screen h-screen bg-secondary/50 absolute z-20 ${alertClosed ? 'opacity-0 pointer-events-none': 'opacity-100 pointer-events-auto'} duration-200 ease-in-out`}>
        <div className="flex flex-col items-center w-[400px] h-[500px] bg-neutral-200 rounded-xl">
          <p className="font-bold text-2xl mt-10 text-secondary">Welcome, User!</p>
          <div className="pb-4 border-b-2 border-secondary-lighter w-16"></div>
          <div className="flex flex-col w-4/5 mt-8">
            <p className="text-black text-sm">We inform you that this page is made for trial purpose
            (in fact, it is a prototype).
            This page offers you a limited features without a server supports. If you want to use unlimited
            features of the application, we recommend you to sign in with Google Login. On this page, your data
            will be kept only in this session.
            </p>
            <p className="text-black text-sm pt-4">Thank you!</p>
          </div>
          <button onClick={() => {setAlertClosed(true)}} className="bg-primary-lighter px-4 relative top-28 hover:bg-primary">I got it</button>
        </div>
      </div>
    </div>
  )
}
