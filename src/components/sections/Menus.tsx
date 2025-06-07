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

/** Agrupa los primeros en array */
function extraerPrimero(raw: MenuRawJSON): Plato[] {
  return [
    raw.primero1,
    raw.primero2,
    raw.primero3,
    raw.primero4,
    raw.primero5,
    raw.primero6,
  ].filter(prot => prot && prot.titulo.trim() !== '');
}

/** Agrupa los segundos en array */
function extraerSegundo(raw: MenuRawJSON): Plato[] {
  return [
    raw.segundo1,
    raw.segundo2,
    raw.segundo3,
    raw.segundo4,
    raw.segundo5,
    raw.segundo6,
  ].filter(prot => prot && prot.titulo.trim() !== '');
}

/** Agrupa los postres en array */
function extraerPostre(raw: MenuRawJSON): Plato[] {
  return [
    raw.postre1,
    raw.postre2,
    raw.postre3,
    raw.postre4,
    raw.postre5,
  ].filter(prot => prot && prot.titulo.trim() !== '');
}

type MenuType = 'daily' | 'weekend';

const Menus: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<MenuType>('daily');
  const { ref: sectionRef, inView } = useInView({ threshold: 0.2 });

  // Estados para el JSON de diario y el JSON de fin de semana
  const [menuDaily, setMenuDaily] = useState<MenuRawJSON | null>(null);
  const [menuWeekend, setMenuWeekend] = useState<MenuRawJSON | null>(null);

  const [loadingDaily, setLoadingDaily] = useState<boolean>(true);
  const [loadingWeekend, setLoadingWeekend] = useState<boolean>(true);
  const [errorDaily, setErrorDaily] = useState<boolean>(false);
  const [errorWeekend, setErrorWeekend] = useState<boolean>(false);

  // 1) Fetch para /menu-daily.json
  useEffect(() => {
    fetch('/menu-daily.json?ts=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((json: MenuRawJSON) => {
        setMenuDaily(json);
      })
      .catch(err => {
        console.error('Error al leer menu-daily.json:', err);
        setErrorDaily(true);
      })
      .finally(() => {
        setLoadingDaily(false);
      });
  }, []);

  // 2) Fetch para /menu-weekend.json
  useEffect(() => {
    fetch('/menu-weekend.json?ts=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((json: MenuRawJSON) => {
        setMenuWeekend(json);
      })
      .catch(err => {
        console.error('Error al leer menu-weekend.json:', err);
        setErrorWeekend(true);
      })
      .finally(() => {
        setLoadingWeekend(false);
      });
  }, []);

  const handleMenuChange = (menuType: MenuType) => {
    setActiveMenu(menuType);
  };

  // Mostrar loading si ambas cargas no han terminado
  if ( (activeMenu === 'daily' && loadingDaily) ||
       (activeMenu === 'weekend' && loadingWeekend) ) {
    return (
      <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
        <div className="container mx-auto px-4 md:px-6 text-center py-16">
          <p className="italic text-gray-500">Cargando menú…</p>
        </div>
      </section>
    );
  }

  // Mostrar error si falla la carga del JSON que corresponde al tab activo
  if ( (activeMenu === 'daily' && errorDaily) ||
       (activeMenu === 'weekend' && errorWeekend) ) {
    return (
      <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
        <div className="container mx-auto px-4 md:px-6 text-center py-16">
          <p className="text-red-500">No se pudo cargar el menú.</p>
        </div>
      </section>
    );
  }

  // Escoger el JSON apropiado según el tab activo
  const menuToShow = activeMenu === 'daily' ? menuDaily! : menuWeekend!;

  return (
    <section id="menus" className="py-24 bg-brown-50" ref={sectionRef}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-brown-700 font-medium">GASTRONOMÍA</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
            Nuestros Menús
          </h2>
          <p className="text-neutral-600 leading-relaxed">
            Desde menús diarios hasta experiencias gastronómicas de fin de semana,
            nuestros platos están elaborados con amor, utilizando los ingredientes
            más frescos de la región.
          </p>
        </div>

        {/* Menu Tabs */}
        <div className="flex flex-wrap justify-center mb-12">
          <button
            className={`px-6 py-3 mx-2 mb-2 rounded-full text-sm font-medium transition-all ${
              activeMenu === 'daily'
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
            onClick={() => handleMenuChange('daily')}
          >
            Menú Diario
          </button>
          <button
            className={`px-6 py-3 mx-2 mb-2 rounded-full text-sm font-medium transition-all ${
              activeMenu === 'weekend'
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
            onClick={() => handleMenuChange('weekend')}
          >
            Menú Fin de Semana
          </button>
        </div>

        {/* Menu Categories (según menuToShow) */}
        <div
          className={`space-y-12 transition-all duration-1000 transform ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
        >
          {/* Primeros */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-center mb-8">
              Primeros
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extraerPrimero(menuToShow).map((item, index) => (
                <MenuCard
                  key={index}
                  title={item.titulo}
                  description={item.descripcion}
                  dietary={item.alergias
                    .split(',')
                    .map(a => a.trim())
                    .filter(a => a !== '')}
                />
              ))}
            </div>
          </div>

          {/* Segundos */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-center mb-8">
              Segundos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extraerSegundo(menuToShow).map((item, index) => (
                <MenuCard
                  key={index}
                  title={item.titulo}
                  description={item.descripcion}
                  dietary={item.alergias
                    .split(',')
                    .map(a => a.trim())
                    .filter(a => a !== '')}
                />
              ))}
            </div>
          </div>

          {/* Postres */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-center mb-8">
              Postres
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {extraerPostre(menuToShow).map((item, index) => (
                <MenuCard
                  key={index}
                  title={item.titulo}
                  description={item.descripcion}
                  dietary={item.alergias
                    .split(',')
                    .map(a => a.trim())
                    .filter(a => a !== '')}
                />
              ))}
            </div>
          </div>

          {/* Precio */}
          <div className="text-center">
            <p className="text-xl font-serif font-bold text-brown-700">
              Menú completo: {menuToShow.precio} €
            </p>
            <p className="text-sm text-neutral-600 mt-2">
              {menuToShow.incluye}
            </p>
          </div>

          {/* Botón de descargar PDF */}
          {menuToShow.archivo_pdf && (
            <div className="text-center mt-12">
              <a
                href={menuToShow.archivo_pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-full bg-white text-brown-700 hover:bg-neutral-100 font-medium transition-all"
              >
                <FilePdf className="mr-2" size={18} />
                Descargar Menú Completo
              </a>
              <p className="mt-4 text-neutral-600 italic text-sm">
                Si tienes alguna alérgia o intolerancia, informa a nuestros camareros
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Menus;