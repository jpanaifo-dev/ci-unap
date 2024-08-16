'use client'
import { useEffect, useState } from 'react'
import { Select, SelectItem, Skeleton } from '@nextui-org/react'
import { getGroups } from '@/libs'
import { IGroupAuth } from '@/types'
import { getRoleByGroup } from '@/utils'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

interface IPropsCheckRole {
  link: string
  group_id: number
  name: string
  role: string
}

function convertGroupsToOptions(groups: IGroupAuth[]): IPropsCheckRole[] {
  return groups.map((group) => {
    return getRoleByGroup(group)
  })
}

export const RoleSection = () => {
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>(true)
  const [groups, setGroups] = useState<IGroupAuth[]>([])

  const rolePath = pathname.split('/')[1]
  const options = convertGroupsToOptions(groups)

  const getGroupsData = async () => {
    const groups = await getGroups()
    setGroups(groups)
  }

  useEffect(() => {
    getGroupsData()
    setLoading(false)
  }, [])

  return (
    <section
      id="role-section"
      className="px-4 py-2"
    >
      {loading && <Skeleton className="w-full h-10 min-w-10 rounded-md" />}
      {!loading && groups?.length > 0 && (
        <section className="flex flex-col gap-2">
          <label
            htmlFor="role-select"
            className="text-xs text-gray-400"
          >
            Mis roles asignados
          </label>
          <Select
            id="role-select"
            aria-label="list options roles"
            placeholder="Selecciona un rol"
            radius="sm"
            disallowEmptySelection
            popoverProps={{
              classNames: {
                content: 'rounded-lg px-1',
              },
            }}
            classNames={{
              base: 'text-warning-500',
              value: 'text-warning-500',
              trigger: 'border border-warning-500',
            }}
            selectedKeys={[rolePath]}
            variant="bordered"
            color="warning"
          >
            {options?.map((group) => (
              <SelectItem
                key={group.role}
                aria-label={`role-${group.role}`}
                as={Link}
                href={group.link}
              >
                {group.name}
              </SelectItem>
            ))}
          </Select>
        </section>
      )}
    </section>
  )
}
