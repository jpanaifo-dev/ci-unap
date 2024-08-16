export function converDate(date?: string) {
  if (date) {
    return new Date(date).toISOString().split('T')[0]
  }
  return ''
}
