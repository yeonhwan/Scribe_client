import '../../Stylesheets/fonts.css'
import { useUserDatasStore } from '../../store/listsStore'
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import Listboards from './Listboards';

export default function Listboard({listboard, refetch}) {

  let listCount = 0;

  const deleteListboardData = () => {
    return axios.delete('http://localhost:5862/listboards', {data : {listboardId : listboard._id}});
  }

  const {mutate : deleteListboard} = useMutation({mutationKey : ['deleteListboard'], mutationFn : deleteListboardData, onSuccess : refetch});

  const deleteHandler = (e) => {
    e.preventDefault();
    console.log('deleting');
    deleteListboard();
  }

  return (
      <div className='mt-8 w-80 flex flex-col items-start rounded-lg bg-neutral-700/30 drop-shadow-lg ml-10'>
        <div className='border-b border-neutral-600 pb-2 w-full mb-4 pl-2 bg-neutral-900/70 rounded-t-lg'>
          <div className='flex justify-between'>
          <h2 className='text-xl font-semibold pt-2'>{listboard.listname}</h2>
          <i onClick={deleteHandler} className='w-5 h-5 fa-solid fa-xmark pl-[5px] pt-[1px] mr-2.5 mt-[15px] rounded-full bg-amber-600 hover:bg-red-500'></i>
          </div>
          <p className='text-xs text-neutral-500'>{listboard.description}</p>
        </div>
        {
          listboard.todos.length > 3 ? 
          <ul>
            {listboard.todos.map((todo) => {
              if(listCount < 3) {
                listCount++;
                return <li className='ml-8 list-disc' key={todo._id}>{todo.todo}</li>
              }
              return null
            })}
            <p className='ml-4 mt-2 text-sm text-neutral-500'>... and {listboard.todos.length - 3} more</p>
          </ul> 
          : <ul>
            {
              listboard.todos.map((todo) => {
                return <li className='ml-8 list-disc' key={todo._id}>{todo.todo}</li>
              })
            }
          </ul>
        }
        <p className='mx-auto mt-8 p-1 px-8 mb-4 rounded-xl bg-neutral-900/40 hover:translate-y-[-3px] hover:bg-emerald-700 ease-in-out duration-100 text-sm'>Taskboard</p>
      </div>
  )
}
