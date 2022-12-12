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
      <div className='group w-full flex flex-col items-start rounded-xl bg-secondary-lighter drop-shadow-lg hover:border hover:border-primary-darker hover:bg-primary-lighter'>
        <div className='border-b border-secondary-lighter pb-2 w-full mb-4 pl-2 bg-secondary group-hover:bg-primary rounded-t-lg group-hover:border-primary'>
          <div className='flex justify-between'>
          <h2 className='text-xl font-semibold pt-2'>{listboard.listname}</h2>
          <i onClick={deleteHandler} className='w-5 h-5 fa-solid fa-trash text-xs pl-[4.5px] pt-[1.5px] mr-2.5 mt-[15px] rounded-full bg-[rgb(84,88,121)] hover:bg-red-500'></i>
          </div>
          <p className='text-xs text-neutral-500 group-hover:text-primary-darker'>{listboard.description}</p>
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
            <p className='ml-4 text-xs text-secondary-darker pl-1 pt-2 absolute'>... and {listboard.todos.length - 3} more</p>
          </ul> 
          : <ul>
            {
              listboard.todos.map((todo) => {
                return <li className='ml-8 list-disc' key={todo._id}>{todo.todo}</li>
              })
            }
          </ul>
        }
        <p className='mx-auto mt-8 p-1 px-8 mb-4 rounded-xl bg-secondary hover:translate-y-[-3px] hover:drop-shadow-lg ease-in-out duration-100 text-sm group-hover:bg-primary-darker'>Taskboard</p>
      </div>
  )
}
