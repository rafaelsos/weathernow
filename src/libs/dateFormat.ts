import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const getUTCDate = (date: Date) => {
  return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
}

export const formatDateUTC = (date: Date, toFormat: string) =>
  format(getUTCDate(date), toFormat, { locale: ptBR })
