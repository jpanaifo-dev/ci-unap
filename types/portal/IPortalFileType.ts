export interface IPortalFileType {
  id: number
  nombre: string
  is_active: boolean
}
export interface IPortalFileTypeFilter {
  id?: number
  is_active?: boolean
  nombre__icontains?: string
  page?: number
}
