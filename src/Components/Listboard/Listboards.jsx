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
    <div className="flex flex-col w-full h-full from-neutral-800 to-stone-800 bg-gradient-to-br">
      <div className="flex ml-4 mt-6">
        <h1 className="text-4xl my-8 ml-7 font-anton tracking-wide border-neutral-400 border-b-2 pb-2 max-w-max">My Listboards</h1>
        <i className="fa-solid fa-clipboard-list text-xl pl-2 pt-0.5 mt-9 ml-2 bg-sky-800 rounded-full w-8 h-8"></i>
      </div>
      {isLoading ? 
       <h1>Loading....</h1>:
       <div className="flex w-[98%] flex-wrap">
        {listboards.map((listboard) => {
          return (
          <Link className="hover:translate-y-[-10px] ease-in-out duration-75 drop-shadow-lg" to={`/listboards/${listboard._id}`} key={listboard._id}>
            <Listboard listboard={listboard} refetch={refetch}/>
          </Link>
          )
        })}
        {isAddMode? 
        <AddNewListboard setIsAddMode={setIsAddMode} refetch={refetch}/>:
        <div onClick={() => {setIsAddMode(true)}} className="group flex justify-center items-center w-[250px] h-[50px] mt-24 ml-20 bg-zinc-700 hover:cursor-pointer rounded-full hover:bg-cyan-700"> 
          <p>Add New Listboard</p>
         <i className="text-xl mt-3 w-10 h-10 fa-solid fa-circle-plus ml-2 text-sky-600 group-hover:text-white"></i>
        </div>
        }
       </div>
      }
    </div>
  )
}
