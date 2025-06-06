import React from 'react';
import { Facebook, Instagram, Twitter, Utensils, Chrome , MessageSquareDiff } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-brown-800 text-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-serif font-bold mb-4">El Balcó de Premià de Dalt</h4>
            <p className="text-brown-100/80 mb-4">
              Un restaurante mediterráneo moderno que ofrece una experiencia gastronómica completa en el corazón de Premià de Dalt.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/elbalcodepremia/" className="text-brown-100 hover:text-white transition-colors" title="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.google.com/search?sca_esv=d777291650d83160&sxsrf=AHTn8zpHNCTDN-DVNFbhvQd2bi2OmdKhbQ:1747158599124&si=APYL9bs7Hg2KMLB-4tSoTdxuOx8BdRvHbByC_AuVpNyh0x2KzYSuHrH-3_4JcRUsEXKJphZbmJzZHSRSE7wazsSlcdXLk0PG0ClHYfCwijP1PNXtDJX_nCD9YEJhm_iAYc7deQ-9rNgaDg9w3lhIs6jYJ0KkqmXS_RFAikm0tKn6LcsfmniqUtI%3D&q=Restaurante+EL+BALC%C3%93+DE+PREMI%C3%80+DE+DALT+Rese%C3%B1as&sa=X&ved=2ahUKEwjl76r9gKGNAxUUzgIHHQ1eKPcQ0bkNegQIRBAE" className="text-brown-100 hover:text-white transition-colors" title="Reseñas Google">
                <MessageSquareDiff size={20} />
              </a>
              <a href="https://www.thefork.es/restaurante/el-balco-de-premia-de-dalt-r293331#booking=" className="text-brown-100 hover:text-white transition-colors" title="The Fork">
                <Utensils size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-brown-100/80 hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#about" className="text-brown-100/80 hover:text-white transition-colors">Nosotros</a></li>
              <li><a href="#cuisine" className="text-brown-100/80 hover:text-white transition-colors">Cocina</a></li>
              <li><a href="#menus" className="text-brown-100/80 hover:text-white transition-colors">Menús</a></li>
              <li><a href="#chefs" className="text-brown-100/80 hover:text-white transition-colors">Chefs</a></li>
              <li><a href="#events" className="text-brown-100/80 hover:text-white transition-colors">Eventos y Celebraciones</a></li>
              <li><a href="#contact" className="text-brown-100/80 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li><a className="text-brown-100/80 hover:underline" href="tel:+34 938 53 56 31">+34 938 53 56 31</a></li>
              <li><a className="text-brown-100/80 hover:underline" href="mailto:info@elbalcodepremia.com">info@elbalcopremia.com</a></li>
              <li><a className="text-brown-100/80 hover:underline" href="https://www.google.com/maps/place/Restaurante+EL+BALC%C3%93+DE+PREMI%C3%80+DE+DALT/@41.5045411,2.3456695,17z/data=!4m16!1m9!3m8!1s0x12a4b6d119300005:0x20e7cec66f1c1da!2sRestaurante+EL+BALC%C3%93+DE+PREMI%C3%80+DE+DALT!8m2!3d41.5045411!4d2.3482444!9m1!1b1!16s%2Fg%2F11c6cr5lp3!3m5!1s0x12a4b6d119300005:0x20e7cec66f1c1da!8m2!3d41.5045411!4d2.3482444!16s%2Fg%2F11c6cr5lp3?entry=ttu&g_ep=EgoyMDI1MDUwNy4wIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D">Torrent Mateu Mas, 31, 08338 Premià de Dalt, Barcelona, España</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Horario</h4>
            <ul className="space-y-2">
              <li className="text-brown-100/80">Martes - Viernes: 12:00 - 23:00</li>
              <li className="text-brown-100/80">Sábado - Domingo: 11:00 - 23:00</li>
              <li className="text-brown-100/80">Lunes: Cerrado</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-brown-700 text-center">
          <p className="text-brown-100/60 text-sm">
            &copy; {currentYear} El Balcó de Premià de Dalt. Todos los derechos reservados.
          </p>
          <p className="text-brown-100/60 text-xs mt-2 font-serif italic">
            El placer está en los detalles {/*¿QUE ES ESTO?*/}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;