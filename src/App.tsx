import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Cuisine from './components/sections/Cuisine';
import Menus from './components/sections/Menus';
import Chefs from './components/sections/Chefs';
import Events from './components/sections/Events';
import ClubConnection from './components/sections/ClubConnection';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/ui/ScrollToTop';

function App() {
  return (
    <div className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden w-full">
      <Header />
      <main className="overflow-x-hidden w-full">
        <Hero />
        <About />
        <Cuisine />
        <Menus />
        <Chefs />
        <Events />
        <ClubConnection />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;