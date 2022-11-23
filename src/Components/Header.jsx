import '../Stylesheets/fonts.css'

export default function Header() {

  
  return (
    <div className='flex items-center py-px bg-zinc-900/50'>
      <img className='w-16 h-16 ml-4' src='./main_title.svg'></img>
      <button className='h-8 px-4 mt-2 mx-4'>login</button>
      <button className='h-8 px-4 mt-2 mx-4'>Stacks?</button>
    </div>
  )
}
