import Listboard from "./Listboard"
import { useState } from "react";
import axios from "axios";
import { useQueryClient, useQuery} from "@tanstack/react-query";
import { Link } from 'react-router-dom'
import AddNewListboard from './AddNewListboard'
import '../../Stylesheets/fonts.css'

const fetchListboards = () => {
  return axios.post('http://localhost:5862/userinfo', {userId : import.meta.env.VITE_USER_ID});
}

export default function Listboards() {
  const [isAddMode, setIsAddMode] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const {isLoading, data, refetch} = useQuery({queryKey : ['fetchListboards'], queryFn : fetchListboards, onSuccess : (data)=>{console.log(data)}});
  const listboards = data?.data.listboards

  return (
    <div className="flex flex-col w-full h-full absolute pl-80 pt-12 bg-secondary-darker">
      {/* gradient-to-br from-[#272b3e] to-[#2d2435] */}
      <div className="flex ml-4 mt-4">
        <h1 className="text-4xl my-8 ml-12 tracking-wide pb-2 max-w-max font-extrabold">My Listboards</h1>
        <i className="fa-solid fa-clipboard-list text-xl pl-2 pt-[2px] mt-10 ml-2 bg-[rgb(59,68,86)] rounded-full w-8 h-8"></i>
      </div>
      {isLoading ? 
       <h1>Loading....</h1>:
       <div className="flex justify-center w-full ml-2">
        <div className="flex max-[1170px]:justify-center w-[90%] flex-wrap">
          {listboards.map((listboard) => {
            return (
            <Link className="hover:translate-y-[-10px] ease-in-out duration-75 drop-shadow-lg w-[30%] mr-6 mt-6 min-w-[250px] max-w-[330px]" to={`/listboards/${listboard._id}`} key={listboard._id}>
              <Listboard listboard={listboard} refetch={refetch}/>
            </Link>
            )
          })}
          {isAddMode? 
          <AddNewListboard setIsAddMode={setIsAddMode} refetch={refetch}/>:
          <div className="w-[30%] flex justify-center min-w-[250px] max-w-[330px] mr-6">
            <div onClick={() => {setIsAddMode(true)}} className="group flex justify-center items-center w-[250px] h-[50px] mt-24 bg-transparent border border-primary-lighter hover:cursor-pointer rounded-full hover:bg-primary"> 
              <p className="ml-4">Add New Listboard</p>
              <i className="text-xl mt-3 w-10 h-10 fa-solid fa-circle-plus ml-2 text-primary-lighter group-hover:text-white"></i>
            </div>
          </div>
          }
        </div>
       </div>
      }
    </div>
  )
}
