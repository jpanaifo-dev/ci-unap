export interface IPublicationFileType {
  id: number
  nombre: string
  is_active: boolean
}
export interface IPublicationFileTypeFilter {
  id?: number
  nombre__icontains?: string
  page?: number
}
