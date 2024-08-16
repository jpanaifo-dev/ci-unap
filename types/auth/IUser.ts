export interface IUser {
  id: number
  username: string
  email: string
  last_name: string
  first_name: string
  last_login: string
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  groups: Array<number>
}
