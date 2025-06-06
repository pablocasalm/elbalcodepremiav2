import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleScrollToContact = () => {
    const contactElm = document.getElementById('contact');
    if (contactElm) {
      contactElm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 w-full"
        style={{
          backgroundImage: "url('imagenes/ElBalcoCTPD_20250601_082.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div 
        className={`relative z-10 text-center px-4 max-w-5xl mx-auto transition-all duration-1000 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 leading-tight">
          Donde se juntan los sabores y las personas
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Menús diarios, eventos privados y la mejor cocina mediterránea en un entorno único.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3 bg-white text-brown-700 hover:bg-white/90 rounded-full font-medium transition-all" onClick={handleScrollToContact}>
            Reservar Mesa
          </button>
          <button className="w-full sm:w-auto px-8 py-3 bg-transparent border-2 border-white/80 text-white hover:bg-white/10 rounded-full font-medium transition-all">
            Explorar Menú
          </button>
        </div>
        <p className="mt-12 text-white/80 italic font-serif">
          El placer está en los detalles
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 -translate-x-1/2 z-10 flex flex-col items-center animate-bounce">
        <span className="text-sm text-white mb-2">Desliza hacia abajo</span>
        <ArrowDown className="text-white" size={20} />
      </div>
    </section>
  );
};

export default Hero;