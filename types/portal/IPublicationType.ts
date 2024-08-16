export interface IPublicationType {
  id: number
  nombre: string
  is_active: boolean
}

export interface IPublicationTypeFilter {
  id?: number
  nombre__icontains?: string
  page?: number
}
