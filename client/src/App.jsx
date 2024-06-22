import './App.css';
import Footer from './components/Footer';
import MyNavBar from './components/NavBar';

import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { useReducer, useState } from 'react';
import { cartReducer, contextStore } from './context';
import AboutUs from './pages/AboutUs';
import Accessories from './pages/Accessories';
import Cart from './pages/Cart';
import ContactUs from './pages/ContactUs';
import Food from './pages/Food';
import Home from './pages/Home';
import Litter from "./pages/Litter";
import Login from './pages/Login';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Shipping from './pages/Shipping';
import ThankYou from './pages/ThankYou';
import Toys from "./pages/Toys";
import Product from './pages/Product';

function App() {

  const [cartItems, cartDispatch] = useReducer(cartReducer, [])

  const [token, setToken] = useState(null);

  const [userData, setUserData] = useState({});

  const [products, setProducts] = useState([]);

  function getToken() {
    setToken(window.localStorage.getItem("token"))
  }

  function NotFound() {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  const { userId, userType } = userData
  console.log(userType, token)

  return (
    < contextStore.Provider value=
      {
        {
          cart: { cartItems, cartDispatch },
          tokenStore: { token, getToken },
          storeUserData: { userData, setUserData },
          storeProducts: { products, setProducts },
        }
      }
    >
      <BrowserRouter>
        <MyNavBar />
        <Routes>
          <Route path='' element={<Outlet />}>
            <Route path="/" element={<Home />} />
            <Route path='food' element={<Food />} />
            <Route path='litter' element={<Litter />} />
            <Route path='accessories' element={<Accessories />} />
            <Route path='toys' element={<Toys />} />
            <Route path='contact' element={<ContactUs />} />
            <Route path='about' element={<AboutUs />} />
            <Route path=':path/:usertype' element={token ? <Navigate to="/" /> : <Login />} />
            <Route path='profile' element={<Profile />} />
            <Route path='product/:productId' element={(userType === "admin" || userType === "seller") ? <Navigate to="/" /> : <Product />} />
            <Route path='cart' element={<Cart />} />
            <Route path='ship' element={token ? <Shipping /> : <Navigate to="/login/user" />} />
            <Route path='pay' element={<Payment />} />
            <Route path='placed' element={<ThankYou />} />
            <Route path="/*" element={<NotFound />} />
          </Route >
        </Routes>
        <Footer />
      </BrowserRouter >
    </ contextStore.Provider >

  )
}

export default App;