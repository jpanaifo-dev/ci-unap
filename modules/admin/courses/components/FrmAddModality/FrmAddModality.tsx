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
import { ILanguages, IModality } from '@/types'
import { DialogAction } from '@/components'
import { InfoData, ActionData, ProgramData } from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  defaulData?: IModality
}

export const FrmAddModality = (props: IProps) => {
  const { defaulData } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IModality>({
    defaultValues: defaulData,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IModality> = async (
    data: IModality
  ) => {
    setOpen(false)
    setLoading(true)

    const newData = {
      ...data,
      programa: data.programa?.id,
    }

    if (defaulData?.id) {
      const res = await fetchCore(`gestor/Modalidad/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(newData),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Modalidad actualizada correctamente')
        handleExit()
      } else {
        toast.error('Error al actualizar la modalidad')
      }
    } else {
      const res = await fetchCore('gestor/Modalidad/', {
        method: 'POST',
        body: JSON.stringify(newData),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Modalidad creada correctamente')
        handleExit()
      } else {
        toast.error('Error al crear la modalidad')
      }
    }
    setLoading(false)
  }

  const handleExit = () => {
    methods.setValue('programa', {} as ILanguages)
    methods.setValue('nombre', '')
    router.refresh()
    router.push('/admin/idiomas/modalidades')
  }
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
                title="Nueva Modalidad"
                subtitle="Agrega una nueva modalidad al sistema"
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <InfoData />
                <ProgramData />
                {defaulData?.id && <ActionData />}
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
                Guardar
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
        title="Guardar Modalidad"
        message="¿Estás seguro de guardar esta modalidad?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
