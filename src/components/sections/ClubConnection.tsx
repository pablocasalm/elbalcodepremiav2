import React from 'react';
import { useInView } from '../hooks/useInView';
import { Trophy, CalendarDays, Clock, Heart } from 'lucide-react';

const ClubConnection: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });
  
  return (
    <section id="club" className="py-24 bg-neutral-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div 
            className={`relative rounded-2xl overflow-hidden h-[500px] transition-all duration-1000 transform ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'
            }`}
          >
            <img 
              src="https://images.pexels.com/photos/6524051/pexels-photo-6524051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Club de Tenis" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <h3 className="text-2xl font-serif font-bold text-white mb-2">
                Club de Tenis y Pádel
              </h3>
              <p className="text-white/90">
                Donde el deporte y la gastronomía se unen
              </p>
            </div>
          </div>
          
          {/* Content Side */}
          <div 
            className={`transition-all duration-1000 transform ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
            }`}
          >
            <span className="text-brown-700 font-medium">COLABORACIÓN CON EL CLUB</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
              Conectados al Club
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              El Balcó de Premià se enorgullece de estar estrechamente vinculado con el Club de Tenis y Pádel local, ofreciendo servicios de restauración especializados y un lugar perfecto para relajarse después de tu partido. Nuestro restaurante mejora la experiencia del club, convirtiéndolo en algo más que una instalación deportiva.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-100 mr-4">
                  <Trophy size={20} className="text-brown-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Catering para Torneos</h4>
                  <p className="text-neutral-600 text-sm">
                    Servicios de alimentación personalizados para competiciones y eventos del club
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-100 mr-4">
                  <CalendarDays size={20} className="text-brown-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Eventos para Socios</h4>
                  <p className="text-neutral-600 text-sm">
                    Reuniones y celebraciones especiales para miembros del club
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-100 mr-4">
                  <Clock size={20} className="text-brown-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Comidas Post-Partido</h4>
                  <p className="text-neutral-600 text-sm">
                    Opciones energizantes y deliciosas para después de tu partido
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-100 mr-4">
                  <Heart size={20} className="text-brown-700" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Opciones Saludables</h4>
                  <p className="text-neutral-600 text-sm">
                    Platos nutritivos diseñados para estilos de vida activos
                  </p>
                </div>
              </div>
            </div>
            
            <p className="italic text-neutral-600 font-serif">
              "La perfecta sinergia entre deporte y gastronomía"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubConnection;