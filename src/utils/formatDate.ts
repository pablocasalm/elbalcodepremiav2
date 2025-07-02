// utils/formatDate.ts
const meses = {
    '01': 'Enero',
    '02': 'Febrero',
    '03': 'Marzo',
    '04': 'Abril',
    '05': 'Mayo',
    '06': 'Junio',
    '07': 'Julio',
    '08': 'Agosto',
    '09': 'Septiembre',
    '10': 'Octubre',
    '11': 'Noviembre',
    '12': 'Diciembre'
  } as const;
  
  export function formatSpanishDate(isoDate: string): string {
    // isoDate: "2025-07-04"
    const [_, mes, dia] = isoDate.split('-');
    const dayNumber = parseInt(dia, 10);        // quita el cero inicial
    const monthName = meses[mes as keyof typeof meses];
    return `${dayNumber} ${monthName}`;
  }