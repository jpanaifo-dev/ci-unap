import { IGroupAuth } from '@/types'

interface IPropsCheckRole {
  link: string
  group_id: number
  name: string
  role: string
}

const linkData = {
  admin: '/admin',
  student: '/student',
  teacher: '/teacher',
  default: '#',
}

export function redirectToRoleUrl(groups: IGroupAuth[]): IPropsCheckRole {
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
      name: adminRole.name,
      link: linkData.admin,
      group_id: adminRole.id,
      role: 'admin',
    }
  } else if (studentRole && !teacherRole) {
    return {
      link: linkData.student,
      group_id: studentRole.id,
      name: studentRole.name,
      role: 'student',
    }
  } else if (teacherRole && !studentRole) {
    return {
      link: linkData.teacher,
      group_id: teacherRole.id,
      name: teacherRole.name,
      role: 'teacher',
    }
  }

  // If no specific role matches, return a default URL or handle the case accordingly
  return {
    link: linkData.default,
    group_id: 0,
    name: 'default',
    role: 'default',
  }
}

export function getRoleByGroup(group: IGroupAuth): IPropsCheckRole {
  const adminRole =
    group.name.toUpperCase() === 'ADMINISTRADOR' ||
    group.name.toUpperCase() === 'ADMIN' ||
    group.name.toUpperCase() === 'ADMINISTRATIVO'

  const studentRole = group.name.toUpperCase() === 'ALUMNO'

  const teacherRole = group.name.toUpperCase() === 'DOCENTE'

  if (adminRole) {
    return {
      name: group.name,
      link: linkData.admin,
      group_id: group.id,
      role: 'admin',
    }
  } else if (studentRole && !teacherRole) {
    return {
      link: linkData.student,
      group_id: group.id,
      name: group.name,
      role: 'student',
    }
  } else if (teacherRole && !studentRole) {
    return {
      link: linkData.teacher,
      group_id: group.id,
      name: group.name,
      role: 'teacher',
    }
  }

  // If no specific role matches, return a default URL or handle the case accordingly
  return {
    link: linkData.default,
    group_id: 0,
    name: 'default',
    role: 'default',
  }
}
