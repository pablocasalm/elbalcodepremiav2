import React, { useState } from 'react';
import { DivideIcon as LucideIcon, ChevronDown, ChevronUp , MessageCircle } from 'lucide-react';
import { musicDates, corporateMenus, celebrationTypes, singlesDates } from '../../data/eventData';


declare global {
  interface Window {
    setEventTypeFromOutside?: (type: string) => void;
  }
}


interface EventCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  image: string;
  type: 'music' | 'corporate' | 'celebrations' | 'singles';
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  description,
  icon: Icon,
  image,
  type
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

const handleCelebrationType = (event: React.MouseEvent, celebrationType: string) => {
  event.stopPropagation();

  const reservationForm = document.getElementById('contact');
  if (reservationForm) {
    // Llama a la función global definida en Contact
    if (typeof window !== 'undefined' && typeof window.setEventTypeFromOutside === 'function') {
      window.setEventTypeFromOutside(celebrationType);
    }

    reservationForm.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderExpandedContent = () => {
    switch (type) {
      case 'music':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="text-white font-medium mb-3">Próximas fechas</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {musicDates.map((event, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-medium text-white">{event.date}</div>
                  <div className="text-white/80 text-sm">{event.time}</div>
                  <div className="text-white/90 mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'corporate':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="text-white font-medium mb-3">Opciones de menú corporativo</h4>
            <div className="grid grid-cols-1 gap-3">
              {corporateMenus.map((menu, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-white">{menu.title}</div>
                    <div className="text-white/80 text-sm">{menu.price}</div>
                  </div>
                  <div className="text-white/80 mt-2 text-sm">{menu.description}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'celebrations':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="text-white font-medium mb-3">Tipos de celebraciones</h4>
            <div className="grid grid-cols-2 gap-2">
              {celebrationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={(e) => handleCelebrationType(e, type.label)}
                  className="p-3 rounded-lg text-left transition-all bg-white/10 hover:bg-white/20 backdrop-blur-sm"
                >
                  <div className="font-medium text-white">{type.label}</div>
                  <div className="text-white/80 text-sm mt-1">{type.description}</div>
                </button>
              ))}
            </div>
        
            <div className="mt-4 p-4 bg-white/10 border border-white/20 rounded-lg text-white text-sm flex items-start space-x-3">
              <MessageCircle size={24} className="text-white mt-0.5" />
              <span>
                La información sobre los menús y las modificaciones se hará mediante WhatsApp al número de teléfono indicado.
              </span>
            </div>
          </div>
        );




      case 'singles':
        return (
          <div className="mt-4 space-y-3">
            <h4 className="text-white font-medium mb-3">Próximos eventos</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {singlesDates.map((event, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <div className="font-medium text-white">{event.date}</div>
                  <div className="text-white/80 text-sm">{event.time}</div>
                  <div className="text-white/90 mt-1">{event.description}</div>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className={`relative rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 ${
        isExpanded ? 'row-span-2' : ''
      }`}
      onClick={toggleExpand}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
      </div>
      
      {/* Content */}
      <div className="relative p-8 min-h-[320px] flex flex-col justify-end z-10">
        <div className="mb-4 p-3 rounded-full bg-white/20 backdrop-blur-sm w-fit">
          <Icon size={24} className="text-white" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">{title}</h3>
        <p className="text-white/80 mb-4">{description}</p>
        
        <div className="flex items-center text-white/90 transition-opacity">
          <span className="mr-2 text-sm">
            {isExpanded ? 'Ver menos' : 'Ver más'}
          </span>
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>

        {isExpanded && renderExpandedContent()}
      </div>
    </div>
  );
};

export default EventCard;