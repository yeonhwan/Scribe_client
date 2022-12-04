import {Routes, Route, Link} from 'react-router-dom';
import Home from './Pages/Home';
import Newtodo from './Pages/Newtodo';
import MyListboards from './Pages/MyListboards';
import UserListboard from './Pages/UserListboard';

function App() {

  return(
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/newTodo' element={<Newtodo/>}/>
      <Route path='/listboards'>
        <Route index element={<MyListboards/>}/>
        <Route path=':id' element={<UserListboard/>}/> 
      </Route>
    </Routes>
  )
}

export default App
