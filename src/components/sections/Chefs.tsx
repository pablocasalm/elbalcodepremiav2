import React from 'react';
import { useInView } from '../hooks/useInView';
import { chefData } from '../../data/chefData';

const Chefs: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });
  
  return (
    <section id="chefs" className="py-24 bg-neutral-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">NUESTRO EQUIPO</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
            Conoce a Nuestros Chefs
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Apasionados por la cocina mediterránea y comprometidos con crear experiencias gastronómicas inolvidables, nuestros talentosos chefs aportan creatividad y experiencia a cada plato.
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 transform ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {chefData.map((chef, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6 mx-auto w-64 h-64 rounded-full overflow-hidden">
                <img 
                  src={chef.image} 
                  alt={chef.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-serif font-bold mb-2">{chef.name}</h3>
              <p className="text-brown-700 font-medium mb-4">{chef.role}</p>
              <p className="text-neutral-600 mb-4 max-w-xs mx-auto">
                {chef.bio}
              </p>
              <p className="italic text-neutral-500 font-serif">"{chef.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Chefs;