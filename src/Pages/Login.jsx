import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className='aboslute z-0 w-screen h-screen bg-cover bg-[url("https://images.unsplash.com/photo-1641326038434-01b0217c18f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2232&q=80")]'>
      <div className="bg-neutral-600/40 backdrop-blur-md w-full h-full flex justify-center items-center">
        <div className="flex flex-col w-[400px] h-[550px] bg-secondary rounded-xl">
          <div className="mx-auto mt-5">
            {/* logo */}
            <svg className="" width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className='stroke-primary' cx="27" cy="27" r="24.5" stroke="#3992A6" strokeWidth="5"/>
              <path className='stroke-primary' d="M43 11L4.5 24.5L49.5 29.5L9.5 42.5" stroke="#3992A6" strokeWidth="3"/>
            </svg>
          </div>
            <p className="text-lg font-bold mt-2 mb-4 text-primary">SCRIBE</p>
            <p className="text-2xl font-bold mb-2">Welcome, User !</p>
            <p className="text-xs font-semibold mb-6">Please set few information before you proceed</p>
            <div className="w-2/5 mx-auto border-b-2 mb-3 border-secondary-lighter"></div>
            <div className="flex flex-col items-center justify-center mx-auto mt-4 w-3/5">
              <label className="mb-1">Username</label>
              <input placeholder="username" className="pl-2 w-40 rounded-lg mb-4"></input>
              <label className="mb-1">User email / User ID</label>
              <input placeholder="www.example.com/image" className="pl-2 w-60 rounded-lg mb-4"></input>
              <label className="mb-1">Choose your avatar image (url)</label>
              <input placeholder="www.example.com/image" className="pl-2 w-60 rounded-lg mb-4"></input>
            </div>
          <div className="flex mx-auto mt-12">
            <button className="w-20 bg-green-600 hover:bg-primary">Save</button>
            <button onClick={() => {navigate('/')}} className="w-20 ml-4 bg-amber-900 hover:bg-red-500">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
