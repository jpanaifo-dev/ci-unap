'use client'
import {
  DrawerCustom,
  HeaderSection,
  ListPublicationTypes,
} from '@/modules/admin'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()

  const handleExit = () => {
    router.back()
  }

  return (
    <>
      <DrawerCustom
        title={
          <HeaderSection
            title="Tipos de publicaciones"
            subtitle="Gestiona los tipos de publicaciones disponibles para el portal"
          />
        }
        isOpen
        content={<ListPublicationTypes />}
        setOpen={handleExit}
      />
    </>
  )
}
