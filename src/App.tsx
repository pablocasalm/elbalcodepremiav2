import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Cuisine from './components/sections/Cuisine';
import Menus from './components/sections/Menus';
import Events from './components/sections/Events';
import ClubConnection from './components/sections/ClubConnection';
import Contact from './components/sections/Contact';
import ScrollToTop from './components/ui/ScrollToTop';
import Admin from './components/sections/Admin';
import Login from './components/sections/login';

function App() {
  // Si la URL es /admin=ALGOTOKEN, renderizamos Admin.tsx y nada más.
  if (window.location.pathname.startsWith('/admin=')) {
    return <Admin />;
  }

  const path = window.location.pathname;

  
    // 1) /login → Login
    if (path === '/login') {
      return <Login />;
    }
  
    // 2) /admin=TOKEN → Admin
    if (path.startsWith('/admin=')) {
   return <Admin />;
}
  // Si no, renderizamos el sitio normal:
  return (
    <div className="font-sans bg-neutral-50 text-neutral-900 overflow-x-hidden w-full">
      <Header />
      <main>
        <Hero />
        <About />
        <Cuisine />
        <Menus />
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

