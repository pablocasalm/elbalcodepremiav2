import React from 'react';
import { useInView } from '../hooks/useInView';
import { Calendar, Music, Users, Heart } from 'lucide-react';
import EventCard from '../ui/EventCard';

const events = [
  {
    title: "Celebraciones Privadas",
    description: "Desde bodas hasta aniversarios, haz que tu día especial sea inolvidable con nuestros menús personalizados y nuestro hermoso entorno mediterráneo.",
    icon: Calendar,
    image: "https://images.pexels.com/photos/5692285/pexels-photo-5692285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: 'celebrations' as const
  },
  {
    title: "Noches de Música en Vivo",
    description: "Únete a nuestros eventos musicales regulares con talento local, creando el ambiente perfecto para una mágica velada mediterránea.",
    icon: Music,
    image: "https://images.pexels.com/photos/2701570/pexels-photo-2701570.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: 'music' as const
  },
  {
    title: "Eventos Corporativos",
    description: "Impresiona a tus clientes o premia a tu equipo con nuestros paquetes corporativos, que incluyen una exquisita gastronomía en un entorno inspirador.",
    icon: Users,
    image: "https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: 'corporate' as const
  },
  {
    title: "Citas Singles",
    description: "Participa en nuestras veladas especiales para singles, donde la buena gastronomía se combina con la oportunidad de conocer gente nueva en un ambiente relajado y elegante.",
    icon: Heart,
    image: "https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: 'singles' as const
  }
];

const Events: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="events" className="py-24 bg-brown-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">CELEBRA CON NOSOTROS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
            Eventos y Celebraciones
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            El Balcó de Premià de Dalt es el lugar perfecto para tus ocasiones especiales, eventos corporativos o simplemente para disfrutar de nuestras noches temáticas y actuaciones en directo.
          </p>
        </div>

        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-auto transition-all duration-1000 transform ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {events.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              description={event.description}
              icon={event.icon}
              image={event.image}
              type={event.type}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;