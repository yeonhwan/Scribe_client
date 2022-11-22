import '../Stylesheets/fonts.css'

export default function Header() {

  
  return (
    <div className='flex items-center py-2 bg-neutral-900'>
      <h1 className="font-anton text-2xl ml-4 text-amber-400">WhatToDo?</h1>
      <button className='h-8 px-4 mt-2 mx-4'>login</button>
      <button className='h-8 px-4 mt-2 mx-4'>Stacks?</button>
    </div>
  )
}
