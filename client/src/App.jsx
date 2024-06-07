import './App.css';
import Footer from './components/Footer';
import MyCard from './components/MyCard';
import MyNavBar from './components/NavBar';

import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";


import Home from './pages/Home';
import Food from './pages/Food';
import Litter from "./pages/Litter";
import Login from './pages/Login';
import Accessories from './pages/Accessories';
import Toys from "./pages/Toys";
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
Food
function App() {
  function NotFound() {
    return (
      <div>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for does not exist.</p>
        <Link to="/">Go back to Home</Link>
      </div>
    );
  }

  return (
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
          <Route path='card' element={<MyCard image="/images/purefood.webp" title="Cat Food" description="Good Cat Food" />} />
          <Route path="/*" element={<NotFound />} />
        </Route >
      </Routes>
      <Footer />
    </BrowserRouter >

  )
}

export default App;