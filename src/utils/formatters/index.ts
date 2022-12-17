import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const formatMoneyString = (money?: string | number): string => {
  const moneyNumber = `${money ?? ''}`.replace(/[^0-9,.]/g, '');
  const value = Number(moneyNumber);
  return Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export const addTimezone = (date: string) => `${date}T00:03:00.000Z`;

export const formatDate = (date: string | Date): string => {
  return format(new Date(date), 'dd LLLL yy', { locale: ptBR });
};
