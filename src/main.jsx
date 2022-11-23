import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Newtodo from './Pages/Newtodo';
import Home from './Pages/Home';
import Listboards from './Pages/Listboards';
import Priorities from './Pages/Priorities';
import Date from './Pages/Date';

const router = createBrowserRouter([
{ path : "/",
  element : <Home/>
},
{
  path : "/newTodo",
  element : <Newtodo/>
},
{
  path : "/listboards",
  element : <Listboards/>
},
{
  path : "/priorities",
  element : <Priorities/>
},
{path : "/date",
element : <Date/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>
)
