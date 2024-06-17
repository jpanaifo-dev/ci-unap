'use client'
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { logoCiunap } from '@/assets/images'
import { IconChevronDown } from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = decodeURIComponent(usePathname())

  return (
    <>
      <header className="bg-black text-white px-1 py-2 text-center">
        <main className="flex justify-between container text-sm">
          <section>
            <h3>Atención al estudiante</h3>
          </section>
          <section className="flex items-center gap-4">
            <Link
              href={'/login'}
              className="text-white"
              aria-label="Iniciar sesión"
            >
              Iniciar sesión
            </Link>
          </section>
        </main>
      </header>
      <Navbar
        aria-label="breadcrum-item"
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="2xl"
        isBlurred={false}
      >
        <NavbarContent>
          <NavbarBrand>
            <Link
              href={'/'}
              passHref
            >
              <Image
                src={logoCiunap.src}
                alt="Logo CIUNAP"
                className="h-12"
                removeWrapper
              />
            </Link>
          </NavbarBrand>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="sm:hidden"
          />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="hidden md:flex gap-4"
        >
          <NavbarItem>
            <Dropdown aria-label="dropdown">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  variant="light"
                  endContent={<IconChevronDown size={16} />}
                >
                  Descubre CIUNAP
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="CIUNAP Actions">
                <DropdownItem
                  key="conocenos"
                  href={'/conocenos'}
                  as={Link}
                >
                  Conócenos
                </DropdownItem>
                <DropdownItem
                  key="convenios"
                  href={'/convenios'}
                  as={Link}
                >
                  Convenios
                </DropdownItem>
                <DropdownItem
                  key="docentes"
                  href={'/docentes'}
                  as={Link}
                >
                  Nuestros docentes
                </DropdownItem>
                <DropdownItem
                  key="reglamento"
                  href={'/reglamentos'}
                  as={Link}
                >
                  Reglamento
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem isActive={pathname === '/idiomas'}>
            <Link href={'/idiomas'}>Idiomas</Link>
          </NavbarItem>
          <NavbarItem isActive={pathname === '/publicaciones'}>
            <Link href={'/publicaciones'}>Publicaciones</Link>
          </NavbarItem>
          <NavbarItem
            isActive={
              pathname === '/becas' ||
              pathname === '/atencion-estudiantes' ||
              pathname === '/examen-clasificacion'
            }
          >
            <Dropdown aria-label="dromdown-2">
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                  variant="light"
                  endContent={<IconChevronDown size={16} />}
                >
                  Zona de alumnos
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Modalidades Actions">
                <DropdownItem
                  as={Link}
                  href="/becas"
                  key="becas"
                >
                  Becas y descuentos
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  href="/atencion-estudiantes"
                  key="atencion"
                >
                  Atención al estudiantes
                </DropdownItem>
                <DropdownItem
                  as={Link}
                  href="/examen-clasificacion"
                  key="clasificacion"
                >
                  Exámenes de clasificación
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          <MobileMenu />
        </NavbarMenu>
      </Navbar>
    </>
  )
}

const itemClasses = {
  base: 'py-0 w-full',
  title: 'font-normal text-medium',
  trigger: 'py-0 data-[hover=true]:bg-default-100 rounded-lg flex items-center',
  indicator: 'text-medium',
  content: 'text-small',
}

const discoverItems = [
  'Conócenos',
  'Convenios',
  'Nuestros docentes',
  'Reglamento',
]

const studentItems = [
  'Becas y descuentos',
  'Atención al estudiantes',
  'Exámenes de clasificación',
]

export const MobileMenu = () => {
  return (
    <div>
      <div className="pt-4">
        <Accordion
          aria-label="accordion-menu"
          itemClasses={itemClasses}
          showDivider={false}
          isCompact
        >
          <AccordionItem
            key="1"
            aria-label="Accordion 1"
            title="Descubre CIUNAP"
          >
            {discoverItems.map((item, index) => (
              <NavbarMenuItem
                key={`${item}-${index}`}
                className="px-2 text-sm"
              >
                <Link
                  color={
                    index === 2
                      ? 'primary'
                      : index === discoverItems.length - 1
                      ? 'danger'
                      : 'foreground'
                  }
                  className="w-full"
                  href="#"
                >
                  {item}
                </Link>
              </NavbarMenuItem>
            ))}
          </AccordionItem>
        </Accordion>
      </div>
      <NavbarItem className="px-2">
        <Link href={'/idiomas'}>Idiomas</Link>
      </NavbarItem>
      <NavbarItem className="px-2">
        <Link href={'/calendario_academico'}>Calendario académico</Link>
      </NavbarItem>
      <div>
        <div>
          <Accordion
            aria-label="accordion-menus"
            itemClasses={itemClasses}
            showDivider={false}
            isCompact
          >
            <AccordionItem
              key="2"
              aria-label="Accordion 2"
              title="Zona de alumnos"
            >
              {studentItems.map((item, index) => (
                <NavbarMenuItem
                  key={`${item}-${index}`}
                  className="px-2 text-sm"
                >
                  <Link
                    color={
                      index === 2
                        ? 'primary'
                        : index === discoverItems.length - 1
                        ? 'danger'
                        : 'foreground'
                    }
                    className="w-full"
                    href="#"
                  >
                    {item}
                  </Link>
                </NavbarMenuItem>
              ))}
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
