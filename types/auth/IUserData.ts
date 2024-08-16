import { IGroupAuth } from './IGroup'
import { IUser } from './IUser'

export interface IUserData {
  token: string
  persona_id: number
  persona_nombres: string
  user: IUser
  groups: IGroupAuth[]
  permissions: any[]
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  last_login: null
  username: string
  email: string
}
