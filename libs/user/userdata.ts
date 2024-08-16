import { IResCookie } from '@/types'
import { getCookie } from '@/utils'

const APP_NAME = process.env.APP_NAME

export const getUserId = async () => {
  const res: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie

  const user = JSON.parse(res.value)

  const id_persona = user.persona_id

  return id_persona
}

export const getUser = async () => {
  const res: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie

  const user = JSON.parse(res.value)

  return user
}

export const getGroups = async () => {
  const res: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie

  const user = JSON.parse(res.value)
  const groups = JSON.parse(user.groups as unknown as string)

  return groups
}

export const getPersonId = async () => {
  const res: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie

  const user = JSON.parse(res.value)

  const id_persona = user.persona_id

  return id_persona
}
