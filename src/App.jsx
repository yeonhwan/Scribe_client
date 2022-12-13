import {Routes, Route, Link} from 'react-router-dom';
import Home from './Pages/Home';
import SimpleTodo from './Pages/SimpleTodo';
import MyListboards from './Pages/MyListboards';
import UserListboard from './Pages/UserListboard';
import Login from './Pages/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  return(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/simple' element={<SimpleTodo/>}/>
        <Route path='/listboards'>
          <Route index element={<MyListboards/>}/>
          <Route path=':id' element={<UserListboard/>}/> 
        </Route>
      </Routes>
    </GoogleOAuthProvider>
  )
}

export default App
