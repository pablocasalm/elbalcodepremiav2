import React, { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';
import ReservationForm from '../ui/ReservationForm';

const specialEventTypes = ['Boda', 'Bautizo', 'Comunión', 'Aniversario', 'Fiesta infantil'];

const Contact: React.FC = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });
  const [numAdults, setNumAdults] = useState<number>(0);
  const [numChildren, setNumChildren] = useState<number>(0);
  const [eventType, setEventType] = useState<string>('');
  const [showSpecialMessage, setShowSpecialMessage] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.setEventTypeFromOutside = (type: string) => {
        setEventType(type);
      };
    }
  }, []);

  useEffect(() => {
    setShowSpecialMessage(specialEventTypes.includes(eventType));
  }, [eventType]);

  return (
    <section id="contact" className="py-24 bg-brown-700 text-white" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-200 font-medium">CONTÁCTANOS</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
            Contacto y Reservas
          </h2>
          <p className="text-brown-100/80 leading-relaxed">
            Estamos deseando darte la bienvenida a El Balcó de Premià. Haz tu reserva, consulta sobre eventos o ven a disfrutar de una experiencia mediterránea auténtica, rodeado de buena gastronomía y mejor ambiente.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Form */}
          <div 
            className={`lg:col-span-2 bg-white text-neutral-800 rounded-xl p-8 transition-all duration-1000 transform ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <h3 className="text-2xl font-serif font-bold mb-6">Reserva tu mesa</h3>
            
            <ReservationForm
              eventType={eventType}
              setEventType={setEventType}
              numAdults={numAdults}
              setNumAdults={setNumAdults}
              numChildren={numChildren}
              setNumChildren={setNumChildren}
            />

            {showSpecialMessage && (
              <div className="p-4 bg-brown-50 text-brown-700 rounded-lg border border-brown-200 mt-6">
                <p className="text-sm">
                  La información sobre los menús y las modificaciones se hará mediante WhatsApp al número de teléfono indicado.
                </p>
              </div>
            )}
          </div>
          
          {/* Contact Info */}
          <div 
            className={`space-y-6 transition-all duration-1000 transform ${
              inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
            }`}
          >
            <div className="bg-brown-600 rounded-xl p-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-500 mr-4">
                  <Phone size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Teléfono</h4>
                  <a href="tel:+34 938 53 56 31" className="text-brown-100 hover:underline">
                    <p className="text-brown-100">+34 938 53 56 31</p>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-brown-600 rounded-xl p-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-500 mr-4">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <p className="text-brown-100">info@elbalcopremia.com</p>
                  <p className="text-brown-100">reservas@elbalcopremia.com</p>
                </div>
              </div>
            </div>
            
            <div className="bg-brown-600 rounded-xl p-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-500 mr-4">
                  <MapPin size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Ubicación</h4>
                  <a
                    href="https://www.google.com/maps/place/Restaurante+EL+BALC%C3%93+DE+PREMI%C3%80+DE+DALT/@41.5045411,2.3456695,17z/data=!3m1!4b1!4m6!3m5!1s0x12a4b6d119300005:0x20e7cec66f1c1da!8m2!3d41.5045411!4d2.3482444!16s%2Fg%2F11c6cr5lp3?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brown-100 hover:underline"
                  >
                    <p className="text-brown-100">C/ Torrent Mateu Mas ,31</p>
                    <p className="text-brown-100">Premià de Dalt, Barcelona</p>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="bg-brown-600 rounded-xl p-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-500 mr-4">
                  <Clock size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Horario</h4>
                  <p className="text-brown-100">Martes - Domingo: 12:00 - 23:00</p>
                  <p className="text-brown-100">Lunes: Cerrado</p>
                </div>
              </div>
            </div>
            
            <div className="bg-brown-600 rounded-xl p-6">
              <div className="flex items-start">
                <div className="p-3 rounded-full bg-brown-500 mr-4">
                  <Instagram size={20} className="text-white" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Redes Sociales</h4>
                  <p className="text-brown-100 hover:underline" href="https://www.instagram.com/elbalcodepremia/">@elbalcopremia</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div 
          className={`mt-12 rounded-xl overflow-hidden transition-all duration-1000 transform ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          <div className="mt-12 rounded-xl overflow-hidden aspect-video w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2987.9877130873015!2d2.34566947683744!3d41.50454107128516!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4b6d119300005%3A0x20e7cec66f1c1da!2sRestaurante%20EL%20BALC%C3%93%20DE%20PREMI%C3%80%20DE%20DALT!5e0!3m2!1ses!2sch!4v1747157005260!5m2!1ses!2sch"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              title="Ubicación de El Balcó de Premià"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;