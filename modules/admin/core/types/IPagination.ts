export interface IPagination {
  count: number
  page: number
  rowsPerPage?: number
  onChangePage?: (newPage: number) => void
}
