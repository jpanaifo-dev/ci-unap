'use client'
import { Button, modal } from '@nextui-org/react'
// To fetch action
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { IModule } from '@/types'
import { InfoData, LevelData, ModalityData } from './sections'
import { useState } from 'react'
import { DialogAction } from '@/components'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'
import { HeaderSection } from '@/modules/admin/core'
import { ProgramData } from './sections/ProgramData'

interface IProps {
  data?: IModule
}

export const FrmAddModule = (props: IProps) => {
  const { data } = props
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const methods = useForm<IModule>({
    defaultValues: {
      ...data,
      programa: data ? data?.modalidad?.programa : {},
    },
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IModule> = async (data: IModule) => {
    setOpen(false)
    setLoading(true)

    const { programa, ...res } = data
    const dataBody = {
      ...res,
      nivel: data.nivel.id,
      modalidad: data.modalidad.id,
    }

    if (data.id) {
      const res = await fetchCore(`gestor/Modulo/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(dataBody),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Curso actualizado')
        handleCancel()
      } else {
        toast.error('Error al actualizar el curso')
      }
    } else {
      const res = await fetchCore('gestor/Modulo/', {
        method: 'POST',
        body: JSON.stringify(dataBody),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Curso agregado')
        handleCancel()
      } else {
        toast.error('Error al agregar el Curso')
      }
    }
    setLoading(false)
  }

  const handleCancel = () => {
    methods.setValue('nombre', '')
    methods.setValue('nivel', {} as any)
    methods.setValue('modalidad', {} as any)
    router.push('/admin/cursos')
  }

  const title = data ? 'Editar curso' : 'Nuevo curso'
  const subtitle = data
    ? 'Edita un curso del sistema.'
    : 'Agrega un nuevo curso al sistema.'

  return (
    <main className="flex flex-col gap-5 w-full section-panel max-w-xl ">
      <HeaderSection
        title={title}
        subtitle={subtitle}
      />
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-5 w-full"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <ProgramData />
          <InfoData />
          <LevelData />
          <ModalityData />
          <footer className="flex items-center gap-3 justify-end">
            <Button
              className="button-dark"
              radius="sm"
              type="submit"
              isLoading={loading}
              isDisabled={loading}
            >
              Guardar
            </Button>

            <Button
              radius="sm"
              onPress={handleCancel}
            >
              Cancelar
            </Button>
          </footer>
        </form>
      </FormProvider>
      <DialogAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Confirmación"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </main>
  )
}
