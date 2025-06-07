// src/components/sections/Admin.tsx
import React, { useState, useEffect, FormEvent } from 'react';
import { useInView } from '../hooks/useInView';

interface Plato {
  titulo: string;
  descripcion: string;
  alergias: string;
}

interface MenuRawJSON {
  timestamp: string;
  tipo: string;
  precio: string;

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

type KeyPlato =
  | 'primero1' | 'primero2' | 'primero3'
  | 'primero4' | 'primero5' | 'primero6'
  | 'segundo1' | 'segundo2' | 'segundo3'
  | 'segundo4' | 'segundo5' | 'segundo6'
  | 'postre1'  | 'postre2'  | 'postre3'
  | 'postre4'  | 'postre5';

const Admin: React.FC = () => {
  // 1) Token de administración
  const ADMIN_TOKEN = "ABC123";

  // 2) Rutas a nuestras Netlify Functions
  const WEBHOOK_DAILY   = '/.netlify/functions/update-daily';
  const WEBHOOK_WEEKEND = '/.netlify/functions/update-weekend';

  // 3) Extraer token de URL
  const raw = window.location.pathname; // "/admin=ABC123"
  let tokenFromURL = '';
  if (raw.startsWith('/admin=')) {
    tokenFromURL = raw.split('/admin=')[1].split('/')[0];
  }

  // 4) Redirigir si el token no coincide
  useEffect(() => {
    if (tokenFromURL !== ADMIN_TOKEN) {
      window.location.href = '/';
    }
  }, []);

  // 5) Control de pestañas
  const [editTab, setEditTab] = useState<'daily' | 'weekend'>('daily');

  // 6) Estados de carga y datos
  const [menuDaily, setMenuDaily] = useState<MenuRawJSON | null>(null);
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [errorDaily, setErrorDaily] = useState(false);

  const [menuWeekend, setMenuWeekend] = useState<MenuRawJSON | null>(null);
  const [loadingWeekend, setLoadingWeekend] = useState(true);
  const [errorWeekend, setErrorWeekend] = useState(false);

  // 7) Estados del formulario
  const [timestamp, setTimestamp] = useState('');
  const [tipo, setTipo] = useState<'daily' | 'weekend'>('daily');
  const [precio, setPrecio] = useState('');

  const inicialPlato: Plato = { titulo: '', descripcion: '', alergias: '' };
  const [formPlatos, setFormPlatos] = useState<Record<KeyPlato, Plato>>({
    primero1: { ...inicialPlato },
    primero2: { ...inicialPlato },
    primero3: { ...inicialPlato },
    primero4: { ...inicialPlato },
    primero5: { ...inicialPlato },
    primero6: { ...inicialPlato },
    segundo1: { ...inicialPlato },
    segundo2: { ...inicialPlato },
    segundo3: { ...inicialPlato },
    segundo4: { ...inicialPlato },
    segundo5: { ...inicialPlato },
    segundo6: { ...inicialPlato },
    postre1: { ...inicialPlato },
    postre2: { ...inicialPlato },
    postre3: { ...inicialPlato },
    postre4: { ...inicialPlato },
    postre5: { ...inicialPlato },
  });

  const [archivoPdf, setArchivoPdf] = useState('');

  // 8) Carga menú diario
  useEffect(() => {
    fetch('/menu-daily.json?ts=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((json: MenuRawJSON) => {
        setMenuDaily(json);
        if (editTab === 'daily') {
          setTimestamp(json.timestamp);
          setTipo('daily');
          setPrecio(json.precio);
          setFormPlatos({
            primero1: json.primero1,
            primero2: json.primero2,
            primero3: json.primero3,
            primero4: json.primero4,
            primero5: json.primero5,
            primero6: json.primero6,
            segundo1: json.segundo1,
            segundo2: json.segundo2,
            segundo3: json.segundo3,
            segundo4: json.segundo4,
            segundo5: json.segundo5,
            segundo6: json.segundo6,
            postre1: json.postre1,
            postre2: json.postre2,
            postre3: json.postre3,
            postre4: json.postre4,
            postre5: json.postre5,
          });
          setArchivoPdf(json.archivo_pdf);
        }
      })
      .catch(err => {
        console.error('Error al leer menu-daily.json:', err);
        setErrorDaily(true);
      })
      .finally(() => {
        setLoadingDaily(false);
      });
  }, [editTab]);

  // 9) Carga menú fin de semana
  useEffect(() => {
    fetch('/menu-weekend.json?ts=' + Date.now())
      .then(res => {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      })
      .then((json: MenuRawJSON) => {
        setMenuWeekend(json);
        if (editTab === 'weekend') {
          setTimestamp(json.timestamp);
          setTipo('weekend');
          setPrecio(json.precio);
          setFormPlatos({
            primero1: json.primero1,
            primero2: json.primero2,
            primero3: json.primero3,
            primero4: json.primero4,
            primero5: json.primero5,
            primero6: json.primero6,
            segundo1: json.segundo1,
            segundo2: json.segundo2,
            segundo3: json.segundo3,
            segundo4: json.segundo4,
            segundo5: json.segundo5,
            segundo6: json.segundo6,
            postre1: json.postre1,
            postre2: json.postre2,
            postre3: json.postre3,
            postre4: json.postre4,
            postre5: json.postre5,
          });
          setArchivoPdf(json.archivo_pdf);
        }
      })
      .catch(err => {
        console.error('Error al leer menu-weekend.json:', err);
        setErrorWeekend(true);
      })
      .finally(() => {
        setLoadingWeekend(false);
      });
  }, [editTab]);

  // 10) Manejar cambios en los platos
  const handlePlatoChange = (
    key: KeyPlato,
    field: keyof Plato,
    value: string
  ) => {
    setFormPlatos(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  // 11) Enviar formulario
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const payload: MenuRawJSON = {
      timestamp,
      tipo,
      precio,
      ...formPlatos,
      archivo_pdf: archivoPdf,
    };

    const webhook = editTab === 'daily' ? WEBHOOK_DAILY : WEBHOOK_WEEKEND;

    fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async res => {
        const text = await res.text();
        if (!res.ok) {
          console.error('Error en función:', res.status, text);
          return alert(
            `Error ${res.status} al actualizar el menú ${
              editTab === 'daily' ? 'Diario' : 'Fin de Semana'
            }:\n${text}`
          );
        }
        alert(
          `Menú ${
            editTab === 'daily' ? 'Diario' : 'Fin de Semana'
          } actualizado correctamente.\nNetlify redeplegará en breve.`
        );
      })
      .catch(err => {
        console.error('Error en la petición a la función:', err);
        alert(
          `Hubo un error inesperado al conectar con la función.\n` +
          `Revisa la consola para más detalles.`
        );
      });
  };

  // 12) Indicadores de carga / error
  if ((editTab === 'daily' && loadingDaily) ||
      (editTab === 'weekend' && loadingWeekend)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Cargando datos del menú…</p>
      </div>
    );
  }
  if ((editTab === 'daily' && errorDaily) ||
      (editTab === 'weekend' && errorWeekend)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">
          No se pudieron cargar los datos del menú {editTab === 'daily' ? 'Diario' : 'Fin de Semana'}.
        </p>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <h1 className="text-3xl font-serif font-bold text-center mb-8">
          Panel de Administración
        </h1>
        <p className="text-center text-neutral-600 mb-8">
          Selecciona qué menú quieres editar y completa los campos. Solo tú tienes acceso.
        </p>

        {/* PESTAÑAS */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setEditTab('daily')}
            className={`px-6 py-2 mx-2 rounded-full text-sm font-medium transition-all ${
              editTab === 'daily'
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Editar Menú Diario
          </button>
          <button
            onClick={() => setEditTab('weekend')}
            className={`px-6 py-2 mx-2 rounded-full text-sm font-medium transition-all ${
              editTab === 'weekend'
                ? 'bg-brown-700 text-white'
                : 'bg-white text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            Editar Menú Fin de Semana
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Timestamp */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timestamp (ISO 8601)
            </label>
            <input
              type="datetime-local"
              value={timestamp.slice(0, 16)}
              onChange={e =>
                setTimestamp(new Date(e.target.value).toISOString())
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de menú
            </label>
            <select
              value={tipo}
              onChange={e =>
                setTipo(e.target.value as 'daily' | 'weekend')
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            >
              <option value="daily">Menú Diario</option>
              <option value="weekend">Menú Fin de Semana</option>
            </select>
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Precio del menú (solo número, sin “€”)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={precio}
              onChange={e => setPrecio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>

          <hr className="border-gray-200" />

          {/* Primeros */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Primeros</h2>
            <div className="space-y-6">
              {(
                ['primero1','primero2','primero3','primero4','primero5','primero6'] as KeyPlato[]
              ).map((key, idx) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Primero {idx + 1}</h3>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={formPlatos[key].titulo}
                      onChange={e =>
                        handlePlatoChange(key, 'titulo', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formPlatos[key].descripcion}
                      onChange={e =>
                        handlePlatoChange(key, 'descripcion', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Alergias (separadas por comas)
                    </label>
                    <input
                      type="text"
                      value={formPlatos[key].alergias}
                      onChange={e =>
                        handlePlatoChange(key, 'alergias', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Segundos */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Segundos</h2>
            <div className="space-y-6">
              {(
                ['segundo1','segundo2','segundo3','segundo4','segundo5','segundo6'] as KeyPlato[]
              ).map((key, idx) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Segundo {idx + 1}</h3>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={formPlatos[key].titulo}
                      onChange={e =>
                        handlePlatoChange(key, 'titulo', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formPlatos[key].descripcion}
                      onChange={e =>
                        handlePlatoChange(key, 'descripcion', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Alergias (separadas por comas)
                    </label>
                    <input
                      type="text"
                      value={formPlatos[key].alergias}
                      onChange={e =>
                        handlePlatoChange(key, 'alergias', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Postres */}
          <div>
            <h2 className="text-2xl font-serif font-bold mb-4">Postres</h2>
            <div className="space-y-6">
              {(
                ['postre1','postre2','postre3','postre4','postre5'] as KeyPlato[]
              ).map((key, idx) => (
                <div key={key} className="border p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Postre {idx + 1}</h3>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Título
                    </label>
                    <input
                      type="text"
                      value={formPlatos[key].titulo}
                      onChange={e =>
                        handlePlatoChange(key, 'titulo', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm text-gray-700 mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={formPlatos[key].descripcion}
                      onChange={e =>
                        handlePlatoChange(key, 'descripcion', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Alergias (separadas por comas)
                    </label>
                    <input
                      type="text"
                      value={formPlatos[key].alergias}
                      onChange={e =>
                        handlePlatoChange(key, 'alergias', e.target.value)
                      }
                      className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-200" />

          {/* Archivo PDF */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL del PDF completo
            </label>
            <input
              type="text"
              value={archivoPdf}
              onChange={e => setArchivoPdf(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
              placeholder="https://ejemplo.com/menus/menu-completo.pdf"
            />
          </div>

          {/* Botón de envío */}
          <div className="text-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-brown-700 text-white rounded-full hover:bg-brown-800 transition-all font-medium"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Admin;