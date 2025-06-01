import React, { useState } from 'react';
import { useInView } from '../hooks/useInView';
import { File as FilePdf } from 'lucide-react';
import MenuCard from '../ui/MenuCard';
import { menuData } from '../../data/menuData';

type MenuType = 'daily' | 'weekend';

const Menus: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('daily');
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });

  const handleMenuChange = (menuType: MenuType) => {
    setActiveMenu(menuType);
  };

  return (
    <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">GASTRONOMÍA</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
            Nuestros Menús
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Desde menús diarios hasta experiencias gastronómicas de fin de semana, nuestros platos están elaborados con amor, utilizando los ingredientes más frescos de la región.
          </p>
        </div>

        {/* Menu Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <button
            className={`px-6 py-3 mx-2 mb-2 rounded-full text-sm font-medium transition-all ${
              activeMenu === 'daily'
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
            onClick={() => handleMenuChange('daily')}
          >
            Menú Diario
          </button>
          <button
            className={`px-6 py-3 mx-2 mb-2 rounded-full text-sm font-medium transition-all ${
              activeMenu === 'weekend'
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
            onClick={() => handleMenuChange('weekend')}
          >
            Menú Fin de Semana
          </button>
        </div>

        {/* Menu Categories */}
        <div 
          className={`space-y-12 transition-all duration-1000 transform ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Primeros */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-center mb-8">Primeros</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData[activeMenu].primeros.map((item, index) => (
                <MenuCard 
                  key={index}
                  title={item.title}
                  description={item.description}
                  
                  dietary={item.dietary}
                />
              ))}
            </div>
          </div>

          {/* Segundos */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-center mb-8">Segundos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData[activeMenu].segundos.map((item, index) => (
                <MenuCard 
                  key={index}
                  title={item.title}
                  description={item.description}
                  dietary={item.dietary}
                />
              ))}
            </div>
          </div>

          {/* Postres */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-center mb-8">Postres</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {menuData[activeMenu].postres.map((item, index) => (
                <MenuCard 
                  key={index}
                  title={item.title}
                  description={item.description}
                  dietary={item.dietary}
                />
              ))}
            </div>
          </div>

          {/* Menu Price */}
          <div className="text-center">
            <p className="text-xl font-serif font-bold text-brown-700">
              Menú completo: {menuData[activeMenu].precio}
            </p>
            <p className="text-sm text-neutral-600 mt-2">
              Incluye pan, una bebida y café
            </p>
          </div>
        </div>

        {/* Download Full Menu Button */}
        <div className="text-center mt-12">
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brown-700 hover:bg-neutral-100 font-medium transition-all"
          >
            <FilePdf className="mr-2" size={18} />
            Descargar Menú Completo
          </a>
          <p className="mt-4 text-neutral-600 italic text-sm">
            Nuestro menú cambia según la temporada para ofrecerte los ingredientes más frescos
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menus;