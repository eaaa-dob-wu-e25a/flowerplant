import { Routes, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './views/Home';
import About from './views/About';
import MyPlants from './views/MyPlants';

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  return (
    <>
      <Header />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/myplants" element={<MyPlants />} />
          </Routes>
        </main>
        <Footer />
    </>
  );
}