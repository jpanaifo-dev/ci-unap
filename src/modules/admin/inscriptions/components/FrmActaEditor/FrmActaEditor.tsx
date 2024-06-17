'use client'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/admin'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { IInscriptions } from '@/types'
import { DialogAction } from '@/components'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'
import { ActionsData, DetailsData } from './sections'

interface IProps {
  defaulData?: IInscriptions
}

export const FrmActaEditor = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IInscriptions>({
    defaultValues: defaulData,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IInscriptions> = async (
    data: IInscriptions
  ) => {
    setOpen(false)
    setLoading(true)

    const { matricula, grupo, ...res } = data

    const newData = {
      ...res,
      matricula: matricula?.id,
      grupo: grupo?.id,
    }

    if (defaulData?.id) {
      const res = await fetchCore(`gestor/Inscripcion/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Descuento actualizado')
        handleExit()
      } else {
        toast.error('Error al actualizar el descuento')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    router.push('/admin/cursos/inscripciones')
  }

  const title = defaulData?.id ? 'Detalles del acta' : ''
  const subtitle = defaulData?.id
    ? 'Modifica los datos del acta a la cual tienes permiso'
    : ''

  return (
    <>
      <Modal
        isOpen
        onClose={handleExit}
        radius="sm"
        size="2xl"
      >
        <ModalContent>
          <ModalHeader>
            <div className="w-full">
              <HeaderSection
                title={title}
                subtitle={subtitle}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <DetailsData data={defaulData} />
                <ActionsData />
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <footer className="flex items-center gap-3 justify-end">
              <Button
                className="button-dark"
                radius="sm"
                type="submit"
                onPress={() => methods.handleSubmit(handleFormSubmit)()}
                isLoading={loading}
                isDisabled={loading}
              >
                Guardar cambios
              </Button>

              <Button
                radius="sm"
                onPress={handleExit}
              >
                Cancelar
              </Button>
            </footer>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DialogAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Confirmación"
        message="¿Estás seguro de guardar los cambios?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
