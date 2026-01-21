import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About'
import Contact from './pages/Contact.jsx'
import Collection from './pages/Collection.jsx'
import Navbar from './components/Navbar.jsx'
import Cart from './pages/Cart.jsx'
import Footer from "./components/Footer";
import SearchBar from './components/SearchBar.jsx'
import Product from './pages/Product.jsx'
import { ToastContainer, toast } from 'react-toastify';
import PlaceOrder from './pages/PlaceOrder.jsx'
import Orders from './pages/Orders.jsx'

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <ToastContainer />
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/collection' element={<Collection />} />
        <Route path='/about' element={<About />} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/place-order' element={<PlaceOrder/>} />
        <Route path='/orders' element={<Orders/>} />
      </Routes>
    
      <Footer/>
    </div>
  )
}

export default App