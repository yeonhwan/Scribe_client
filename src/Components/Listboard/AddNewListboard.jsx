import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddNewListboard({setIsAddMode, refetch}) {

  const [nameInput, setNameInput] = useState('');
  const [descInput, setDescInput] = useState('');

  const addNewListboardData = () => {
    return axios.post('http://localhost:5862/listboards/create/newlistboard', {
      userId : import.meta.env.VITE_USER_ID,
      listboardData : {
        listname : nameInput,
        description : descInput
      }
    })
  }

  const clickHandler = (e) => {
    setIsAddMode(false);
  }

  const submitHandler = () => {
    addNewListboard();
    setIsAddMode(false);
  }

  const {mutate : addNewListboard} = useMutation({mutationKey : ['addNewListboard'], mutationFn : addNewListboardData, onSuccess : refetch});

  return (
    <div onClick={(e) => {clickHandler(e)}} className="flex justify-center items-center absolute z-20 top-0 left-0 w-screen h-screen bg-neutral-800/80 backdrop-blur-md">
      <div onClick={(e) => {e.stopPropagation()}} className="flex flex-col justify-center items-center w-[400px] h-[400px] bg-neutral-300 rounded-xl backdrop-blur-lg">
        <h1 className="font-semibold text-xl text-black">Creating New Listboard</h1>
        <label className="text-slate-800 mb-2 mt-6" htmlFor="listNameInput">Type in your new listboard name</label>
        <input onChange={(e) => {setNameInput(e.target.value)}} value={nameInput} id="listNameInput" className="mb-6 pl-2 w-[200px] mx-auto rounded-md p-1" placeholder="listboard name"/>
        <label className="text-slate-800 mb-2" htmlFor="listDescInput">Describe your new listboard</label>
        <input onChange={(e) => {setDescInput(e.target.value)}} value={descInput} id="listDescInput" className="mb-10 pl-2 w-[200px] mx-auto rounded-md p-1" placeholder="listboard description"/>
        <div className="flex justify-evenly">
          <button onClick={submitHandler} className="px-11 bg-slate-800 hover:bg-primary">save</button>
          <button className="px-10 bg-amber-900 hover:bg-red-700 ml-2"onClick={() =>{setIsAddMode(false)}}>cancel</button>
        </div>
      </div>
    </div>
  )
}
