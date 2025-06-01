import React, { useState } from 'react';

interface ReservationFormProps {
  eventType: string;
  setEventType: (type: string) => void;
  numAdults: number;
  setNumAdults: (num: number) => void;
  numChildren: number;
  setNumChildren: (num: number) => void;
}

const ReservationForm: React.FC<ReservationFormProps> = ({
  eventType,
  setEventType,
  numAdults,
  setNumAdults,
  numChildren,
  setNumChildren
}) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [reservationDate, setReservationDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // Extract date components
    const date = new Date(reservationDate);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Extract time components
    const [hours, minutes] = time.split(':');

    // Update hidden date/time fields
    const dayInput = form.querySelector('[name="entry.1575887333_day"]') as HTMLInputElement;
    const monthInput = form.querySelector('[name="entry.1575887333_month"]') as HTMLInputElement;
    const yearInput = form.querySelector('[name="entry.1575887333_year"]') as HTMLInputElement;
    const hourInput = form.querySelector('[name="entry.223671730_hour"]') as HTMLInputElement;
    const minuteInput = form.querySelector('[name="entry.223671730_minute"]') as HTMLInputElement;

    dayInput.value = day.toString();
    monthInput.value = month.toString();
    yearInput.value = year.toString();
    hourInput.value = hours;
    minuteInput.value = minutes;

    form.submit();
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <>
      <iframe name="hidden_iframe" style={{ display: 'none' }}></iframe>
      
      <form
        method="POST"
        action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSckqMW8LHgXp2k9PdikRPoRK2aSaI2Q3s6WAzK7mKk_lerfyA/formResponse"
        target="hidden_iframe"
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="eventType" className="block text-sm font-medium mb-1">Tipo de evento</label>
            <input 
              type="text" 
              id="eventType"
              name="entry.270609897"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
              placeholder="Ej: Cena familiar, Cumpleaños..."
            />
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
            <input 
              type="text" 
              id="name"
              name="entry.1314617318"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input 
              type="email" 
              id="email"
              name="entry.319241390"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
            <input 
              type="tel" 
              id="phone"
              name="entry.24218658"
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="numAdults" className="block text-sm font-medium mb-1">Número de adultos</label>
            <input 
              type="number" 
              id="numAdults"
              name="entry.1129070191"
              min="0"
              value={numAdults}
              onChange={(e) => setNumAdults(parseInt(e.target.value) || 0)}
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="numChildren" className="block text-sm font-medium mb-1">Número de niños</label>
            <input 
              type="number" 
              id="numChildren"
              name="entry.1947918491"
              min="0"
              value={numChildren}
              onChange={(e) => setNumChildren(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label htmlFor="reservationDate" className="block text-sm font-medium mb-1">Fecha</label>
            <input 
              type="date" 
              id="reservationDate"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
          <div>
            <label htmlFor="time" className="block text-sm font-medium mb-1">Hora de llegada</label>
            <input 
              type="time" 
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Hidden date/time fields for Google Forms */}
        <input type="hidden" name="entry.1575887333_day" />
        <input type="hidden" name="entry.1575887333_month" />
        <input type="hidden" name="entry.1575887333_year" />
        <input type="hidden" name="entry.223671730_hour" />
        <input type="hidden" name="entry.223671730_minute" />

        {numAdults > 0 && (
          <div>
            <label htmlFor="adultDiet" className="block text-sm font-medium mb-1">
              ¿Algún adulto tiene alguna alergia o restricción alimentaria? Por favor, indícalo aquí.
            </label>
            <textarea 
              id="adultDiet"
              name="entry.1679792808"
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all resize-none"
              placeholder="Ej: 3 Celíacos, 2 Vegetarianos..."
            ></textarea>
          </div>
        )}

        {numChildren > 0 && (
          <div>
            <label htmlFor="childrenDiet" className="block text-sm font-medium mb-1">
              ¿Algún niño tiene alguna alergia o restricción alimentaria? Por favor, indícalo aquí.
            </label>
            <textarea 
              id="childrenDiet"
              name="entry.494294301"
              rows={3}
              className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all resize-none"
              placeholder="Ej: 3 Celíacos, 2 Vegetarianos..."
            ></textarea>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">¿Preferencia de mesa?</label>
          <div className="flex space-x-6">
            <div className="flex items-center">
              <input
                type="radio"
                id="interior"
                name="entry.112724317"
                value="Interior"
                required
                className="h-4 w-4 text-brown-700 border-neutral-300 focus:ring-brown-500"
              />
              <label htmlFor="interior" className="ml-2 text-sm">Interior</label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="terraza"
                name="entry.112724317"
                value="Terraza"
                className="h-4 w-4 text-brown-700 border-neutral-300 focus:ring-brown-500"
              />
              <label htmlFor="terraza" className="ml-2 text-sm">Terraza</label>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="comments" className="block text-sm font-medium mb-1">Observaciones adicionales</label>
          <textarea 
            id="comments"
            name="entry.2119860354"
            rows={4}
            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-brown-500 focus:border-transparent transition-all resize-none"
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full sm:w-auto px-6 py-3 bg-brown-700 text-white hover:bg-brown-800 rounded-lg font-medium transition-all"
        >
          Reservar mesa
        </button>

        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            Reserva enviada correctamente
          </div>
        )}
      </form>
    </>
  );
};

export default ReservationForm;