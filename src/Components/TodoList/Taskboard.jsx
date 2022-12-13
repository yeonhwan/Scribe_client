import { useRef } from "react"
import Chart from "./Chart";

export default function Taskboard({isTaskboardMode, todos}) {

  const completedTasks = todos.reduce((completed, todo) => {
    if(todo.done) return completed + 1;
    return completed;
  }, 0)

  const urgent = todos.reduce((urgent, todo) => {
    if(todo.priority === 1) return urgent + 1;
    return urgent
  }, 0)

  const important = todos.reduce((important, todo) => {
    if(todo.priority === 2) return important + 1;
    return important
  }, 0)

  const percentage = completedTasks ? Math.ceil(completedTasks / todos?.length * 100) : 0

  const normal = todos.length - (urgent + important)

  return (
    <div className={`flex flex-col min-h-max items-start mt-20 ml-6 ${isTaskboardMode ? 'h-[450px] w-72 opacity-100' : 'h-[450px] w-0 opacity-0'} bg-neutral-700/50 rounded-xl smooth-trans duration-300 overflow-hidden`}>
      <div className={`pl-2 transition-opacity duration-50 ${isTaskboardMode ? 'opacity-100' : 'opacity-0'} w-full`}>
        <p className="text-xl font-semibold ml-6 mt-3 pb-1 mb-2 max-w-max border-b-2 border-secondary-lighter">Taskboard</p>
        <p className="ml-6 text-sm min-w-max">Achivements percentage</p>
        <div className="flex w-full ml-6">
          <div className="flex flex-col items-center mt-2 w-4/5 min-w-[220px] h-40 bg-neutral-600/50 rounded-xl">
              <div className="w-24 h-24 pt-2 ml-2 mb-2">
              {isTaskboardMode && todos && <Chart total={todos?.length} completedTasks={completedTasks}/>}
            </div>
            <div className={`flex text-lg text-[#6060FF] text-center font-semibold ease-in-out duration-300 delay-100 ${isTaskboardMode ? 'opacity-100' : 'opacity-0'}`}>{`${percentage}%`}<p className="text-primary-lighter text-xs pl-1 pt-2">done</p></div>
            <p className={`text-xs text-[#6060FF] text-center font-semibold ease-in-out duration-300 delay-100 ${isTaskboardMode ? 'opacity-100' : 'opacity-0'}`}>{percentage < 100 ? !percentage ? 'Not Started' : 'Proceeding' :'Completed'}</p>
          </div>
        </div>
        <div className="flex ml-6 mt-3 text-sm">Summary</div>
        <div className="flex w-4/5 ml-6">
          <div className="flex items-center mt-2 min-w-[220px] h-32 bg-neutral-600/50 rounded-xl">
            <div className={`flex flex-wrap ${isTaskboardMode ? "opaciy-100" : "opacity-0"} h-20 w-full ease-in-out duration-700`}>
              <div className="ml-2 text-xs justify-items-stretch"><i className="fa-solid fa-fire text-red-400 mx-2"></i><span className="text-neutral-400">{`Urgent : ${urgent}`}</span></div>
              <div className="ml-2 text-xs justify-items-stretch"><i className="fa-solid fa-bolt-lightning text-yellow-400 mx-2"></i><span className="text-neutral-400">{`Important : ${important}`}</span></div>
              <div className="ml-2 text-xs justify-items-stretch"><i className="fa-solid fa-circle text-sky-600 mx-2"></i><span className="text-neutral-400">{`Normal : ${normal}`}</span></div>
              <div className="ml-1 text-xs justify-items-stretch"><i className="fa-solid fa-circle-check text-emerald-600 mx-2"></i><span className="text-neutral-400">{`Done : ${completedTasks}`}</span></div>
              <div className="ml-2 text-xs justify-items-stretch"><i className="fa-solid fa-person-running text-amber-600 mx-2"></i><span className="text-neutral-400">{`Active : ${todos.length - completedTasks}`}</span></div>
              <div className="ml-3 text-xs justify-items-stretch"><i className="fa-solid fa-list mx-2"></i><span className="text-neutral-200">Total : {todos.length}</span></div>            
            </div>
         </div>
        </div>
      </div>
    </div>
  )
}
