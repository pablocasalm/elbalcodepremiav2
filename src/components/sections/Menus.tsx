// src/components/sections/Menus.tsx

import React, { useState, useEffect } from 'react';
import { useInView } from '../hooks/useInView';
import { File as FilePdf } from 'lucide-react';
import MenuCard from '../ui/MenuCard';

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

type MenuType = 'daily' | 'weekend';

const Menus: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('daily');
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    if (inView) setHasBeenInView(true);
  }, [inView]);

  const [menuDaily, setMenuDaily] = useState<MenuRawJSON | null>(null);
  const [menuWeekend, setMenuWeekend] = useState<MenuRawJSON | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [loadingWeekend, setLoadingWeekend] = useState(true);
  const [errorDaily, setErrorDaily] = useState(false);
  const [errorWeekend, setErrorWeekend] = useState(false);

  useEffect(() => {
    fetch(`/menu-daily.json?ts=${Date.now()}`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then((json: MenuRawJSON) => setMenuDaily(json))
      .catch(() => setErrorDaily(true))
      .finally(() => setLoadingDaily(false));
  }, []);

  useEffect(() => {
    fetch(`/menu-weekend.json?ts=${Date.now()}`)
      .then(res => { if (!res.ok) throw new Error(); return res.json(); })
      .then((json: MenuRawJSON) => setMenuWeekend(json))
      .catch(() => setErrorWeekend(true))
      .finally(() => setLoadingWeekend(false));
  }, []);

  const menuToShow = activeMenu === 'daily' ? menuDaily : menuWeekend;

  if ((activeMenu === 'daily' && loadingDaily) || (activeMenu === 'weekend' && loadingWeekend)) {
    return (
      <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
        <div className="container mx-auto px-4 text-center py-16">
          <p className="italic text-gray-500">Cargando menú…</p>
        </div>
      </section>
    );
  }
  if ((activeMenu === 'daily' && errorDaily) || (activeMenu === 'weekend' && errorWeekend)) {
    return (
      <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
        <div className="container mx-auto px-4 text-center py-16">
          <p className="text-red-500">No se pudo cargar el menú.</p>
        </div>
      </section>
    );
  }

  if (!menuToShow) return null;

  return (
    <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">GASTRONOMÍA</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">Nuestros Menús</h2>
          <p className="text-neutral-600 leading-relaxed">
            Desde menús diarios hasta experiencias gastronómicas de fin de semana, nuestros platos están elaborados con amor, utilizando los ingredientes más frescos de la región.
          </p>
        </div>

        <div className="flex justify-center mb-12 gap-4">
          {(['daily', 'weekend'] as MenuType[]).map(type => (
            <button
              key={type}
              onClick={() => setActiveMenu(type)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeMenu === type ? 'bg-brown-700 text-white' : 'bg-white text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {type === 'daily' ? 'Menú Diario' : 'Menú Fin de Semana'}
            </button>
          ))}
        </div>

        <div className={`space-y-12 transition-all duration-700 transform ${hasBeenInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {[
            { label: 'Primeros', items: extraerPrimero(menuToShow) },
            { label: 'Segundos', items: extraerSegundo(menuToShow) },
            { label: 'Postres', items: extraerPostre(menuToShow) },
          ].map(section => (
            <div key={section.label}>
              <h3 className="text-2xl font-serif font-bold text-center mb-8">{section.label}</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {section.items.map((item, idx) => (
                  <div key={idx} className="w-full">
                    <MenuCard
                      title={item.titulo}
                      description={item.descripcion}
                      dietary={item.alergias
                        .split(',')
                        .map(a => a.trim())
                        .filter(a => a)}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="text-center">
            <p className="text-xl font-serif font-bold text-brown-700">Menú completo: {menuToShow.precio} €</p>
            <p className="text-sm text-neutral-600 mt-2">{menuToShow.incluye}</p>
          </div>

          {menuToShow.archivo_pdf && (
            <div className="text-center mt-12">
              <a
                href={menuToShow.archivo_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brown-700 hover:bg-neutral-100 font-medium transition-all"
              >
                <FilePdf className="mr-2" size={18} /> Descargar Menú Completo
              </a>
              <p className="mt-4 text-neutral-600 italic text-sm">
                Si tienes alguna alergia o intolerancia, informa a nuestros camareros
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menus;