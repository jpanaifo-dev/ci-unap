'use client'
import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { HeaderSection } from '@/modules/admin'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { ITypeDoc } from '@/types'
import { DialogAction } from '@/components'
import { InfoData } from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  defaulData?: ITypeDoc
}

export const FrmAddDocType = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<ITypeDoc>({
    defaultValues: defaulData,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<ITypeDoc> = async (data: ITypeDoc) => {
    setOpen(false)
    setLoading(true)
    if (defaulData?.id) {
      const res = await fetchCore(`gestor/TipoDocumento/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Tipo de documento actualizado correctamente')
        handleExit()
      } else {
        toast.error('Error al actualizar el tipo de documento')
      }
    } else {
      const res = await fetchCore('gestor/TipoDocumento/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Tipo de documento creado correctamente')
        handleExit()
      } else {
        toast.error('Error al crear el tipo de documento')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    methods.reset()
    router.push('/admin/personas/documentos')
  }

  const title: string = defaulData
    ? 'Editar tipo de documento'
    : 'Agregar tipo de documento'

  const subtitle: string = defaulData
    ? 'Editar los datos del tipo de documento'
    : 'Agregar un nuevo tipo de documento'

  return (
    <>
      <Modal
        isOpen
        onClose={handleExit}
        radius="sm"
        size="4xl"
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
                className="p-4 flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <InfoData />
                <footer className="flex items-center gap-3 justify-end">
                  <Button
                    className="button-dark"
                    radius="sm"
                    type="submit"
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    {defaulData ? 'Actualizar' : 'Guardar'}
                  </Button>

                  <Button
                    radius="sm"
                    onPress={handleExit}
                  >
                    Cancelar
                  </Button>
                </footer>
              </form>
            </FormProvider>
          </ModalBody>
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
