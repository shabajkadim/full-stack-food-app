
import {Route, Routes} from 'react-router-dom'
import Home from './components/Home';
import { Navbar } from './components/navbar/Navbar';
import Register from './components/Register';
import Menu from './components/Pages/Menu';
import About from './components/Pages/About';
import Contact from './components/Pages/Contact';
import NewProduct from './components/Pages/NewProduct';
import Login from './components/Pages/Login';
import SignUp from './components/Pages/SingUp';
import NoPageFound from './components/NoPageFound';
import Demo from './components/Pages/Demo';
import Cart from './components/Pages/Cart';



function App() {
  
  return (
    <div >
      <Navbar />
      <Routes>
        <Route path='*' element={<NoPageFound/>} />
        <Route path='/' element={<Home/>} />
        <Route path='menu/:id' element={<Menu/>} />
        <Route path='about' element={<About/>} />
        <Route path='contact' element={<Contact/>} />
        <Route path='register' element={<Register/>} />
        <Route path='new-product' element={<NewProduct/>} />
        <Route path='login' element={<Login/>} />
        <Route path='sign-up' element={<SignUp/>}  />
        <Route path='demo' element={<Demo/>}/>
        <Route path='cart' element={<Cart/>}/>
</Routes>
    </div>
  );
}

export default App;
