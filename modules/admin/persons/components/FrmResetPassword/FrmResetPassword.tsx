'use client'
import { DialogAction } from '@/components'
import { HeaderSection } from '@/modules/admin/core'
import { Button } from '@nextui-org/button'
import { useState } from 'react'
import { fetchCore } from '@/api'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { IconArrowLeft } from '@tabler/icons-react'

interface IProps {
  id: string
}

export const FrmResetPassword = (props: IProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { id } = props

  const onSubmit = () => {
    setIsOpen(true)
  }

  const handleResetPassword = async () => {
    setIsOpen(false)
    setLoading(true)
    try {
      const response = await fetchCore(`accounts/reset_password/`, {
        method: 'POST',
        body: JSON.stringify({ person_id: id }),
      })
      if (response.status === 200) {
        toast.success('La contraseña se restableció correctamente')
      } else {
        toast.error('Ocurrió un error al restablecer la contraseña')
      }
    } catch (error) {
      toast.error('Ocurrió un error al restablecer la contraseña')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="w-full max-w-3xl p-6 border rounded-lg flex flex-col gap-4">
        <section>
          <div className="flex gap-2 items-center">
            <IconArrowLeft
              size={20}
              className="text-blue-500"
            />
            <Link
              href="/admin/personas"
              className="text-blue-500 hover:underline cursor-pointer text-sm"
            >
              Volver a la lista de personas
            </Link>
          </div>
        </section>
        <HeaderSection
          title="Restablecer contraseña"
          subtitle="Aquí puedes restablecer la contraseña de la persona seleccionada. Recuerda que al restablecer la contraseña, la contraseña será el número de documento de la persona."
        />
        <section className="text-center">
          <Button
            radius="sm"
            className="button-dark"
            onPress={onSubmit}
            isDisabled={loading}
            isLoading={loading}
          >
            Restablecer contraseña
          </Button>
        </section>
      </section>
      <DialogAction
        isOpen={isOpen}
        setOpen={setIsOpen}
        onPress={handleResetPassword}
        title="Restablecer contraseña"
        message="¿Estás seguro de que deseas restablecer la contraseña de esta persona?"
      />
    </>
  )
}
