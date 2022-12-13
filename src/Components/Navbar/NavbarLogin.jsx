import { useAppStateStore } from "../../store/appStateStore"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

export default function NavbarOpened() {

  const navigate = useNavigate();

  const username = useAppStateStore((state) => state.loginDetail.username);
  const avatarUrl = useAppStateStore((state) => state.loginDetail.userAvatarUrl);
  const removeLoginDetail = useAppStateStore((state) => state.removeLoginDetail);
  const setUserLogout = useAppStateStore((state) => state.setUserLogout);
  const removeUserIdToken = useAppStateStore((state) => state.removeUserIdToken);


  const logoutHandler = () => {
    setUserLogout();
    removeUserIdToken();
    removeLoginDetail();
    navigate('/');
  }

  return (
    <div className=" bg-secondary left h-full w-[270px] absolute z-20">
      <Link to={'/'}>
        <div className="flex items-center ml-4 mt-4">
        <svg className="mt-3.5" width="30" height="30" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className='stroke-[rgb(74,98,205)]' cx="27" cy="27" r="24.5" stroke="#3992A6" strokeWidth="5"/>
          <path className='stroke-[rgb(74,98,205)]' d="M43 11L4.5 24.5L49.5 29.5L9.5 42.5" stroke="#3992A6" strokeWidth="3"/>
        </svg>
        <h1 className="ml-2 pt-4 text-xl font-semibold">SCRIBE</h1>
        </div>
      </Link>
      <div className="mb-8 pt-4 pb-0.5 px-2 border-b border-secondary-lighter">
        <h1 className="text-sm ml-2 mb-2 text-[rgb(107,114,142)]">{`Welcome, ${username} !`}</h1>
        <div className="flex">
          <img className="ml-2 w-8 h-8 rounded-full" src={avatarUrl}></img>
          <div className="flex items-center mb-2">
            <p className="text-xl ml-2 mb-2">username</p>
            <i className="fa-solid fa-user ml-4 pb-2 text-secondary-lighter"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="group w-full mb-4 hover:bg-navbar-hover hover:ml-2 hover:rounded-l-xl hover:cursor-pointer ease-in-out duration-75">
          <div className="flex ml-6 items-center">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-solid fa-clipboard-list text-md pt-px text-neutral-300 group-hover:text-navbar-icon"></i>
            </div>
            <Link className="ml-4" to={`/listboards`}>My Listboards</Link>
          </div>
        </div>
        <div className="group w-full mb-4 hover:bg-navbar-hover hover:ml-2 hover:rounded-l-xl hover:cursor-pointer ease-in-out duration-75">
          <div className="flex items-center ml-6 w-full">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-solid fa-circle-plus text-sm text-neutral-300 group-hover:text-navbar-icon"></i>
            </div>
            <Link to={`/newTodo`} className="ml-2 pt-px px-2">Make Simple Todo</Link>
          </div>
        </div>
        <div className="group w-full mb-4 hover:bg-red-500 hover:ml-2 hover:rounded-l-xl hover:cursor-pointer ease-in-out duration-75">
          <div className="flex items-center ml-6 w-full">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-solid fa-circle-exclamation text-sm text-neutral-300 group-hover:text-white"></i>
            </div>
            <div onClick={logoutHandler} className="ml-2 pt-px px-2">Logout</div>
          </div>
        </div>
      </div>
    </div>
  )
}
