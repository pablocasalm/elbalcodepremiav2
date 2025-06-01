interface EventDate {
  date: string;
  time: string;
  description: string;
}

interface CorporateMenu {
  title: string;
  description: string;
  price: string;
}

interface CelebrationType {
  id: string;
  label: string;
  description: string;
}

export const musicDates: EventDate[] = [
  {
    date: "24 Mayo",
    time: "20:30",
    description: "Jazz en vivo con Trio Mediterráneo"
  },
  {
    date: "31 Mayo",
    time: "21:00",
    description: "Noche de Flamenco Fusión"
  },
  {
    date: "7 Junio",
    time: "20:30",
    description: "Música Acústica con Mar i Vent"
  }
];

export const corporateMenus: CorporateMenu[] = [
  {
    title: "Menú Ejecutivo",
    description: "Menú de 3 platos con opciones premium, ideal para almuerzos de negocios",
    price: "35€/persona"
  },
  {
    title: "Catering para Reuniones",
    description: "Selección de aperitivos y platos principales servidos en formato buffet",
    price: "28€/persona"
  },
  {
    title: "Coffee Break Premium",
    description: "Café, té, zumos naturales y selección de pasteles artesanales",
    price: "15€/persona"
  }
];

export const celebrationTypes: CelebrationType[] = [
  {
    id: "bodas",
    label: "Bodas",
    description: "Celebra tu día especial con un menú personalizado"
  },
  {
    id: "bautizos",
    label: "Bautizos",
    description: "Menús especiales para celebraciones familiares"
  },
  {
    id: "comuniones",
    label: "Comuniones",
    description: "Espacios y menús adaptados para este día único"
  },
  {
    id: "aniversarios",
    label: "Aniversarios",
    description: "Momentos memorables en un entorno especial"
  },
  {
    id: "fiestas-infantiles",
    label: "Fiestas infantiles",
    description: "Menús y actividades para los más pequeños"
  }
];

export const singlesDates: EventDate[] = [
  {
    date: "26 Mayo",
    time: "21:00",
    description: "Cena Temática: Cocina Italiana"
  },
  {
    date: "2 Junio",
    time: "21:00",
    description: "Speed Dating & Tapas"
  },
  {
    date: "9 Junio",
    time: "20:30",
    description: "Noche de Vinos y Singles"
  }
];