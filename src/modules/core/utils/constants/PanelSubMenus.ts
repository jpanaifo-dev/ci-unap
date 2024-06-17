import { IMenuBar } from '@/modules/admin'
import { subMenuAdmin } from './adminMenu'
import { subMenuStudent } from './studentMenu'
import { subMenuTeacher } from './teacherMenu'

export const subMenus: { [role: string]: IMenuBar[] } = {
  admin: subMenuAdmin,
  student: subMenuStudent,
  teacher: subMenuTeacher,
}
