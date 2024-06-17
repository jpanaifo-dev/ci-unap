export function isDisabledScore(date: Date, days: number): boolean {
  const dateParse = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
  const dateClose = new Date(dateParse)
  dateClose.setDate(dateClose.getDate() + days)
  return dateClose < new Date()
}
