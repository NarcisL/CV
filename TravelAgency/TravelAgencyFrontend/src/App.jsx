import './App.css'
import Destinations from './Components/Destinations/Destinations'
import Footer from './Components/Footer/Footer'
import Home from './Components/Home/Home'
import Middle from './Components/Middle/Middle'
import Navbar from './Components/Navbar/Navbar'
import Portfolio from './Components/Portfolio/Portfolio'
import Questions from './Components/Questions/Questions'
import Reviews from './Components/Reviews/Reviews'
import Subscribe from './Components/Subscribe/Subscribe'
import React, { useState } from 'react';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [email, setEmail] = useState('');
    return (
    <div>
      <Navbar isSignedIn={isSignedIn} setIsSignedIn={setIsSignedIn} email={email} setEmail={setEmail} />
      <Home/>
      <Middle/>
      <Destinations isSignedIn={isSignedIn} email={email} />
      <Portfolio/>
      <Reviews/>
      <Questions/>
      <Subscribe/>
      <Footer/>
    </div>
  )
}

export default App