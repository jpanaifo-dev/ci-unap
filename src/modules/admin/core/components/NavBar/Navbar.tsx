/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Select,
  SelectItem,
  User,
} from '@nextui-org/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { getCookie, redirectToRoleUrl, logout } from '@/utils'
import { useEffect, useState } from 'react'
import { IGroupAuth, IResCookie, IUserData } from '@/types'

const APP_NAME = process.env.APP_NAME

const findIndexArray = (rols: IGroupAuth[], id: string) => {
  const index = rols?.findIndex((rol) => {
    return rol?.id?.toString() === id
  })
  return index
}

export const NavBar = () => {
  const [groups, setGroups] = useState<IGroupAuth[]>([])
  const [idGroup, setIdGroup] = useState<string>('')

  const [user, setUser] = useState<IUserData | null>(null)
  const router = useRouter()

  const idGroupIndex = findIndexArray(groups, idGroup)

  const getGroups = async () => {
    const user: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie
    const userData: IUserData = JSON.parse(user.value)
    const groups = userData
      ? await JSON.parse(userData.groups as unknown as string)
      : null
    if (groups) {
      setGroups(groups)
      setIdGroup(groups[0].id.toString())
    }
  }

  const getUser = async () => {
    const userRes: IResCookie = (await getCookie(
      `${APP_NAME}_user`
    )) as IResCookie
    const { user } = JSON.parse(userRes.value) as IUserData

    if (userRes) {
      setUser(JSON.parse(userRes.value))
    }
  }

  useEffect(() => {
    getGroups()
  }, [])

  useEffect(() => {
    getUser()
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleSelectGroup = (id: string) => {
    setIdGroup(id)
  }

  return (
    <>
      <Navbar
        maxWidth="2xl"
        className="bg-white"
      >
        <NavbarContent
          aria-label="Main navigation"
          className="hidden sm:flex gap-4 items-center"
          justify="start"
        >
          <NavbarItem
            aria-label="Home-Logo"
            className="block lg:hidden"
          >
            <NavbarMenuToggle />
          </NavbarItem>
          <NavbarItem
            aria-label="Home"
            className="w-full max-w-52"
          >
            <div className="w-full">
              {groups?.length > 0 && (
                <Select
                  aria-label="Select your group"
                  aria-labelledby="Select your group"
                  radius="sm"
                  variant="bordered"
                  disallowEmptySelection
                  selectedKeys={[groups[idGroupIndex]?.id.toString()]}
                >
                  {groups?.map((group) => (
                    <SelectItem
                      aria-label={`Select ${group.name}`}
                      key={group.id.toString()}
                      as={Link}
                      href={redirectToRoleUrl([group]).link}
                      onPress={() =>
                        handleSelectGroup(
                          redirectToRoleUrl([group]).group_id.toString()
                        )
                      }
                    >
                      {group?.name}
                    </SelectItem>
                  ))}
                </Select>
              )}
            </div>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent
          aria-label="User navigation"
          justify="end"
        >
          {user && (
            <NavbarItem aria-label="User menu">
              <Dropdown
                placement="bottom-end"
                showArrow
                radius="sm"
                classNames={{
                  content: 'border-sm',
                }}
                aria-label="User dropdown menu"
              >
                <DropdownTrigger>
                  <User
                    name={`${user.persona_nombres}`}
                    description={user?.email}
                    as={Button}
                    variant="light"
                    className="transition-transform"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="User menu"
                  variant="flat"
                  classNames={{
                    list: 'rounded-sm',
                    base: 'rounded-sm',
                  }}
                >
                  <DropdownItem
                    aria-label="Profile"
                    key="profile"
                  >
                    <p>Perfil</p>
                  </DropdownItem>
                  <DropdownItem
                    aria-label="Cerrar sesión"
                    key="logout"
                    color="danger"
                    onPress={handleLogout}
                  >
                    <p>Cerrar sesión</p>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          )}
        </NavbarContent>
      </Navbar>
    </>
  )
}
