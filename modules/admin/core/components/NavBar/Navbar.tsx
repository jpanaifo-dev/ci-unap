/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button, Navbar, NavbarContent, NavbarItem } from '@nextui-org/react'


import { IconMenu2 } from '@tabler/icons-react'
import { UserPopover } from './UserPopover'

// const APP_NAME = process.env.APP_NAME

const handleOpenMenu = () => {
  const sidebar = document.getElementById('sidebar')
  const sidebarBackdrop = document.getElementById('backdrop')
  if (sidebar) {
    sidebar.classList.toggle('hidden')
  }
  if (sidebarBackdrop) {
    sidebarBackdrop.classList.toggle('hidden')
  }
}

export const NavBar = () => {
  // const [groups, setGroups] = useState<IGroupAuth[]>([])
  // const [idGroup, setIdGroup] = useState<string>('')

  // const idGroupIndex = findIndexArray(groups, idGroup)

  // const getGroups = async () => {
  //   const user: IResCookie = (await getCookie(`${APP_NAME}_user`)) as IResCookie
  //   const userData: IUserData = JSON.parse(user.value)
  //   const groups = userData
  //     ? await JSON.parse(userData.groups as unknown as string)
  //     : null
  //   if (groups) {
  //     setGroups(groups)
  //     setIdGroup(groups[0].id.toString())
  //   }
  // }

  // useEffect(() => {
  //   getGroups()
  // }, [])

  // const handleSelectGroup = (id: string) => {
  //   setIdGroup(id)
  // }

  return (
    <Navbar
      maxWidth="full"
      className="bg-white"
    >
      <NavbarContent
        aria-label="Main navigation"
        className="sm:flex gap-4 items-center"
        justify="start"
      >
        <NavbarItem
          aria-label="Home-Logo"
          className="block lg:hidden z-50"
        >
          <Button
            isIconOnly
            onPress={handleOpenMenu}
            variant="light"
            className="text-gray-500"
          >
            <IconMenu2 size={24} />
          </Button>
        </NavbarItem>
        {/* <NavbarItem
          aria-label="Home"
          className="w-full max-w-52 hidden lg:block"
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
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent
        aria-label="User navigation"
        justify="end"
      >
        <UserPopover />
      </NavbarContent>
    </Navbar>
  )
}
