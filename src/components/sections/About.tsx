import React from 'react';
import { useInView } from '../hooks/useInView';

const imageUrls = [
  "public/imagenes/ElBalcoCTPD_20250601_083.jpg",
  "public/imagenes/Imagen-planta-sala.jpeg",
  "public/imagenes/Imagen-sala-marco.jpeg",
  "public/imagenes/ElBalcoCTPD_20250601_085.jpg"
];

const About: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });
  
  return (
    <section id="about" className="py-24 bg-neutral-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">SOBRE NOSOTROS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
            Más que un restaurante – un estilo de vida.
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Ubicado en el corazón de Premià de Dalt, El Balcó ofrece un espacio renovado y versátil, ideal para relajarse después del tenis, disfrutar con amigos y familia, o simplemente saborear la brisa mediterránea mientras degustas una cocina excepcional.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 transform ${
          inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="col-span-1 lg:col-span-2 h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={imageUrls[0]} 
              alt="Vista de la terraza del restaurante" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={imageUrls[1]} 
              alt="Área interior del comedor" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={imageUrls[2]} 
              alt="Chef preparando comida" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-1 lg:col-span-2 h-[400px] rounded-2xl overflow-hidden">
            <img 
              src={imageUrls[3]} 
              alt="Ambiente del restaurante" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-16 text-center">
          <p className="text-neutral-600 italic font-serif">
            "Un santuario donde la gastronomía y la naturaleza se funden perfectamente, creando momentos que perduran para siempre."
          </p>
          <p className="mt-4 text-brown-700 font-medium">
            está en los ojos
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;