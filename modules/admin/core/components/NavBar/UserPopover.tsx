'use client'
import { useEffect, useState } from 'react'
import { getUser } from '@/libs'
import { IUserData } from '@/types'
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
  User,
  DropdownItem,
} from '@nextui-org/react'
import { logout } from '@/utils'
import { useRouter } from 'next/navigation'

export const UserPopover = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [user, setUser] = useState<IUserData | null>(null)

  const getUserData = async () => {
    const userData = await getUser()
    const grupos = JSON.parse(userData.groups as unknown as string)
    const userAuth = JSON.parse(userData.user as unknown as string)

    const user = {
      ...userData,
      groups: grupos,
      user: userAuth,
    }

    setUser(user)
  }

  useEffect(() => {
    getUserData()
    setLoading(false)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  return (
    <main className="">
      <section className="flex w-full">
        {loading ? (
          <div className="flex gap-2 w-full items-center">
            <Skeleton className="w-10 h-10 min-w-10 rounded-full" />
            <div className="flex flex-col gap-1 w-full">
              <Skeleton className="w-40 rounded-md h-4" />
              <Skeleton className="rounded-md h-3 w-56" />
            </div>
          </div>
        ) : (
          <Dropdown
            placement="bottom-end"
            aria-label="User dropdown menu"
            showArrow
            radius="sm"
            classNames={{
              content: 'border-sm',
            }}
          >
            <DropdownTrigger>
              <User
                name={user?.persona_nombres}
                description={user?.user?.username}
                className="hover:cursor-pointer"
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
                key="profile-info"
                className="h-14 gap-2"
                textValue='Perfil'
              >
                <p className="font-semibold"> Iniciado sesión como:</p>
                <p className="font-semibold">{user?.user?.username}</p>
              </DropdownItem>
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
        )}
      </section>
    </main>
  )
}
