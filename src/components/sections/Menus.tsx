// src/components/sections/Menus.tsx

import React, { useState, useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import { File as FilePdf } from 'lucide-react';
import MenuCard from '../ui/MenuCard';
import { Fireworks } from 'fireworks-js';

interface Plato {
  titulo: string;
  descripcion: string;
  alergias: string;
}

interface MenuRawJSON {
  timestamp: string;
  tipo: string;
  precio: string;
  incluye: string;

  primero1: Plato;
  primero2: Plato;
  primero3: Plato;
  primero4: Plato;
  primero5: Plato;
  primero6: Plato;

  segundo1: Plato;
  segundo2: Plato;
  segundo3: Plato;
  segundo4: Plato;
  segundo5: Plato;
  segundo6: Plato;

  postre1: Plato;
  postre2: Plato;
  postre3: Plato;
  postre4: Plato;
  postre5: Plato;

  vinotinto:Plato;
  vinoblanco:Plato;

  archivo_pdf: string;
}

function extraerPrimero(raw: MenuRawJSON): Plato[] {
  return [raw.primero1, raw.primero2, raw.primero3, raw.primero4, raw.primero5, raw.primero6]
    .filter(p => p && p.titulo.trim());
}
function extraerSegundo(raw: MenuRawJSON): Plato[] {
  return [raw.segundo1, raw.segundo2, raw.segundo3, raw.segundo4, raw.segundo5, raw.segundo6]
    .filter(p => p && p.titulo.trim());
}
function extraerPostre(raw: MenuRawJSON): Plato[] {
  return [raw.postre1, raw.postre2, raw.postre3, raw.postre4, raw.postre5]
    .filter(p => p && p.titulo.trim());
}
function extraerVinos(raw: MenuRawJSON): Plato[] {
  return [raw.vinoblanco, raw.vinotinto]
    .filter(p => p && p.titulo.trim());
}

type MenuType = 'daily' | 'weekend' | 'Special';

const Menus: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('daily');
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });

  const fireworksRef = useRef<HTMLDivElement>(null);

  // detectar móvil y asegurar visibilidad
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // controlar animación una vez visible o en móvil
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (inView || isMobile) {
      setVisible(true);
    }
  }, [inView, isMobile]);

  const [menuDaily, setMenuDaily] = useState<MenuRawJSON | null>(null);
  const [menuWeekend, setMenuWeekend] = useState<MenuRawJSON | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [loadingWeekend, setLoadingWeekend] = useState(true);
  const [errorDaily, setErrorDaily] = useState(false);
  const [errorWeekend, setErrorWeekend] = useState(false);

  //EVENTO ESPECIAL

  const [menuSpecial , setMenuSpecial] = useState<MenuRawJSON | null>(null); 
  const [loadingSpecial , setLoadingSpecial] = useState(true); 
  const [errorSpecial , setErrorSpecial] = useState(false); 

  //-------

  useEffect(() => {
    fetch(`/menu-daily.json?ts=${Date.now()}`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => setMenuDaily(json))
      .catch(() => setErrorDaily(true))
      .finally(() => setLoadingDaily(false));
  }, []);

  useEffect(() => {
    fetch(`/menu-weekend.json?ts=${Date.now()}`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then(json => setMenuWeekend(json))
      .catch(() => setErrorWeekend(true))
      .finally(() => setLoadingWeekend(false));
  }, []);

  useEffect(() => {
    fetch(`/menu-special.json?ts=${Date.now()}`)
    .then(res => { if (!res.ok) throw new Error(); return res.json(); })
    .then(json => setMenuSpecial(json))
    .catch(() => setErrorSpecial(true))
    .finally(() => setLoadingSpecial(false));
  }, []);

  if ((activeMenu === 'daily' && loadingDaily) || (activeMenu === 'weekend' && loadingWeekend) || (activeMenu === 'Special' && loadingSpecial)) {
    return (
      <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
        <div className="container mx-auto px-4 text-center py-16">
          <p className="italic text-gray-500">Cargando menú…</p>
        </div>
      </section>
    );
  }
  if ((activeMenu === 'daily' && errorDaily) || (activeMenu === 'weekend' && errorWeekend) || (activeMenu === 'Special' && errorSpecial)) {
    return (
      <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-red-500">No se pudo cargar el menú.</p>
        </div>
      </section>
    );
  }

  const menuToShow = activeMenu === 'daily' ? menuDaily : (activeMenu === 'weekend' ? menuWeekend : menuSpecial);

  if (!menuToShow) return null;

  const handleMenuClick = (type: MenuType) => {
    setActiveMenu(type);
    if (type !== 'Special' || !fireworksRef.current) return;
  
    const container = fireworksRef.current;
    // asegúrate de tener esto en el style:
    // transition: 'opacity 3s ease-out';
  
    // 1) sube la opacidad para mostrar el canvas
    container.style.opacity = '1';
  
    // 2) arranca los fuegos
    const fw = new Fireworks(container, {
      traceLength: 4,
      traceSpeed: 10,
      acceleration: 1.1,
      friction:    0.93,
      gravity:     1.2,
      particles:   80,
      explosion:   6,
      brightness:  { min: 50, max: 90 },
      decay:       { min: 0.005, max: 0.01 },
      delay:       { min: 5, max: 15 },
    });
    fw.start();
  
    const launchDuration = 4000;    // tiempo que queremos lanzar
    const fadeDuration   = 3000;    // duración del fade-out en ms
  
    // 3) tras “launchDuration” deja de lanzar, pero NO borres aún el canvas
    setTimeout(() => {
      // A) detén nuevos lanzamientos:
      //    - si usas v2.x: fw.stop(false)
      //    - en v1.x no hay parámetro: usa fw.pause() en su lugar
      if (typeof fw.stop === 'function') {
        fw.stop(false);      // stop(dispose=false) → deja las partículas vivas
      } else {
        fw.pause();          // v1.x: togglea start/stop sin clear
      }
  
      // B) arranca el fade-out CSS (tarda “fadeDuration” en ir a 0)
      //container.style.opacity = '0';
  
      // 4) una vez concluido el fade, limpia el canvas del todo:
      setTimeout(() => {
        //fw.clear();          // ahora sí borra los restos
      }, fadeDuration);
    }, launchDuration);
  };

  return (
    <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
            <div
        ref={fireworksRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: 9999,
          transition: 'opacity 3s ease-out',
        }}
      />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">GASTRONOMÍA</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">Nuestros Menús</h2>
          <p className="text-neutral-600 leading-relaxed">
            Desde menús diarios hasta experiencias gastronómicas de fin de semana, nuestros platos están elaborados con amor, utilizando los ingredientes más frescos de la región.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12 gap-4">
          {(['daily','weekend','Special'] as MenuType[]).map(type => (
            <button
            key={type}
            onClick={() => handleMenuClick(type)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeMenu === type
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            } ${
              type === 'Special'
                ? 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white'
                : ''
            }`}
          >
            {type === 'daily'
              ? 'Menú Diario'
              : type === 'weekend'
              ? 'Menú Fin de Semana'
              : 'Menú de San Juan'}
          </button>
          ))}
        </div>

        <div className={`space-y-12 transition-all duration-700 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {[
            { label: activeMenu === 'Special' ? 'Para Compartir' : 'Primeros', items: extraerPrimero(menuToShow)},
            { label:'Segundos', items: extraerSegundo(menuToShow)},
            { label:'Postres', items: extraerPostre(menuToShow)},
            { label: activeMenu === 'Special' ? 'Vinos' : '', items: extraerVinos(menuToShow)},
          ].map(section => (
            <div key={section.label}>
              <h3 className="text-2xl font-serif font-bold text-center mb-8">{section.label}</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {section.items.map((item, idx) => (
                  <MenuCard
                    key={idx}
                    title={item.titulo}
                    description={item.descripcion}
                    dietary={item.alergias.split(',').map(a=>a.trim()).filter(a=>a)}
                  />
                ))}
              </div>
            </div>
          ))}
          <div className="text-center">

          </div>

          <div className="text-center">
            <p className="text-xl font-serif font-bold text-brown-700">Menú completo: {menuToShow.precio} €</p>
            <p className="text-sm text-neutral-600 mt-2">{menuToShow.incluye}</p>
          </div>

          {menuToShow.archivo_pdf && (
            <div className="text-center mt-12">
              <a href={menuToShow.archivo_pdf} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brown-700 hover:bg-neutral-100 font-medium transition-all"
              >
                <FilePdf className="mr-2" size={18} /> Descargar Menú Completo
              </a>
              <p className="mt-4 text-neutral-600 italic text-sm">Si tienes alguna alergia o intolerancia, informa a nuestros camareros</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menus;