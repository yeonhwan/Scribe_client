import '../Stylesheets/fonts.css'
import { Link } from 'react-router-dom'

export default function Header() {

  
  return (
    <div className='absolute z-10 flex h-[8%] items-center py-px bg-neutral-900/0'>
      <Link to={'/listboards'}>
        <img className='w-16 h-16 ml-4' src='/public/main_title.svg'/>
      </Link>
      <button className='h-8 px-4 mt-2 mx-4'>login</button>
      <button className='h-8 px-4 mt-2 mx-4'>Stacks?</button>
    </div>
  )
}
