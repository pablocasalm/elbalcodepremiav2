import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import NavLink from '../ui/NavLink';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <div className="z-50 flex items-center gap-2">
            <a href="#" 
        className="flex items-center gap-2"
      >
              {/*href="#" 
              className={`text-xl md:text-2xl font-serif font-bold tracking-tight ${
                isScrolled ? 'text-brown-700' : 'text-white'
              }`}
            >
              <img
                src={isScrolled ? "public/logos/logo-brown-700.png" : "public/logos/logo-white.png"}
                alt="Logo El Balcó de Premià"
                className="h-8 w-auto"
              />
              El Balcó de Premià
            </a>*/}
            
        <img
          src={isScrolled ? "public/logos/logo-brown-700 copy.png" : "public/logos/logo-white copy.png"}
          alt="Logo El Balcó de Premià"
          className="h-8 w-auto"
        />
        <span
          className={`text-xl md:text-2xl font-serif font-bold tracking-tight ${
            isScrolled ? 'text-brown-700' : 'text-white'
          }`}
        >
          El Balcó de Premià
        </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="#about" isScrolled={isScrolled}>Nosotros</NavLink>
            <NavLink href="#cuisine" isScrolled={isScrolled}>Cocina</NavLink>
            <NavLink href="#menus" isScrolled={isScrolled}>Menús</NavLink>
            <NavLink href="#chefs" isScrolled={isScrolled}>Chefs</NavLink>
            <NavLink href="#events" isScrolled={isScrolled}>Eventos y Celebraciones</NavLink>
            <NavLink href="#club" isScrolled={isScrolled}>Club</NavLink>
            <NavLink href="#contact" isScrolled={isScrolled}>Contacto</NavLink>
            
            <button 
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-brown-700 hover:bg-brown-800 text-white' 
                  : 'bg-white hover:bg-opacity-90 text-brown-700'
              } font-medium`}
            >
              Reservar
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`md:hidden z-50 ${isScrolled || isMenuOpen ? 'text-brown-700' : 'text-white'}`}
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 text-xl">
          <NavLink href="#about" onClick={toggleMenu} isMobile>Nosaltres</NavLink>
          <NavLink href="#menus" onClick={toggleMenu} isMobile>Menús</NavLink>
          <NavLink href="#chefs" onClick={toggleMenu} isMobile>Xefs</NavLink>
          <NavLink href="#events" onClick={toggleMenu} isMobile>Esdeveniments</NavLink>
          <NavLink href="#club" onClick={toggleMenu} isMobile>El Club</NavLink>
          <NavLink href="#contact" onClick={toggleMenu} isMobile>Contacte</NavLink>
          
          <button 
            className="px-6 py-2 rounded-full bg-brown-700 hover:bg-brown-800 text-white font-medium mt-4"
            onClick={toggleMenu}
          >
            Reservar
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;