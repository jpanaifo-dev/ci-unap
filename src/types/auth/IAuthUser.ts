import { IGroupAuth } from './IGroup'
import { IUser } from './IUser'

export interface IAuthUser {
  groups: IGroupAuth[]
  permissions: string[]
  persona_id: number
  persona_nombres: string
  token: string
  user: IUser
}
