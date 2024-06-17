import { IGroupAuth } from '@/types'

const linkData = {
  admin: '/admin',
  student: '/student',
  teacher: '/teacher',
  default: '#',
}

export function redirectToRoleUrl(groups: IGroupAuth[]): {
  link: string
  group_id: number
} {
  const adminRole = groups.find(
    (group) =>
      group.name.toUpperCase() === 'ADMINISTRADOR' ||
      group.name.toUpperCase() === 'ADMIN' ||
      group.name.toUpperCase() === 'ADMINISTRATIVO'
  )
  const studentRole = groups.find(
    (group) => group.name.toUpperCase() === 'ALUMNO'
  )
  const teacherRole = groups.find(
    (group) => group.name.toUpperCase() === 'DOCENTE'
  )

  if (adminRole) {
    return {
      link: linkData.admin,
      group_id: adminRole.id,
    }
  } else if (studentRole && !teacherRole) {
    return {
      link: linkData.student,
      group_id: studentRole.id,
    }
  } else if (teacherRole && !studentRole) {
    return {
      link: linkData.teacher,
      group_id: teacherRole.id,
    }
  }

  // If no specific role matches, return a default URL or handle the case accordingly
  return {
    link: linkData.default,
    group_id: 0,
  }
}
