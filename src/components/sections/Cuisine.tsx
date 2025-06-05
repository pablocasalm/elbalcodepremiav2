import React from 'react';
import { useInView } from '../hooks/useInView';
import { ChevronRight } from 'lucide-react';

const images = [
  {
    url: "imagenes/Platos/ElBalcoCTPD_20250601_051.jpg",
    alt: "Pulpo a la brasa con puré de boniato"   //TODO CAMBIAR 
  },
  {
    url: "imagenes/Platos/ElBalcoCTPD_20250601_054_cortada.jpg",
    alt: "Ensalada de temporada con vinagreta cítrica"    //TODO CAMBIAR 
  },
  {
    url: "imagenes/Platos/ElBalcoCTPD_20250601_057_cortada.jpg",
    alt: "Hummus casero con pan artesanal"
  },
  {
    url: "imagenes/Platos/ElBalcoCTPD_20250601_061.jpg",
    alt: "Paella mediterránea con mariscos frescos"
  },
  {
    url: "imagenes/Platos/ElBalcoCTPD_20250601_063.jpg",
    alt: "Coulant de chocolate con frutos rojos"
  },
  {
    url: "imagenes/Platos/ElBalcoCTPD_20250601_075_cortada.jpg",
    alt: "Aperitivo con vermut y aceitunas"
  }
];

const Cuisine: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-24 bg-neutral-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div 
            className={`transition-all duration-1000 transform ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <span className="text-brown-700 font-medium">NUESTRA COCINA</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
              Alma Mediterránea con un Toque Creativo
            </h2>
            <div className="space-y-4 text-neutral-600 leading-relaxed">
              <p>
                En <em>El Balcó de Premià</em>, cada plato cuenta una historia. Inspirados en la riqueza de la cocina mediterránea tradicional e impulsados por una visión creativa y actual, nuestra propuesta culinaria celebra el equilibrio, el color y la autenticidad.
              </p>
              <p>
                Con ingredientes frescos, de temporada y combinaciones sorprendentes, nuestro equipo de cocina crea platos que alimentan el cuerpo y despiertan los sentidos.
              </p>
              <p>
                Tanto si vienes tras un partido como si te apetece una comida tranquila con amigos, aquí te espera una experiencia gastronómica pensada para tu estilo de vida: vibrante, saludable y llena de sabor.
              </p>
            </div>
            <a 
              href="#menus" 
              className="inline-flex items-center mt-8 px-6 py-3 bg-brown-700 text-white rounded-full hover:bg-brown-800 transition-colors"
            >
              Descubre nuestros menús
              <ChevronRight size={20} className="ml-2" />
            </a>
          </div>

          {/* Image Gallery */}
          <div 
            className={`grid grid-cols-2 gap-4 transition-all duration-1000 transform ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            {images.map((image, index) => (
              <div 
                key={index}
                className={`rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 ${
                  index === 0 || index === 5 ? 'col-span-2' : 'col-span-1'
                }`}
              >
                <div className="relative group aspect-video">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <p className="text-white p-4 text-sm font-medium">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cuisine;