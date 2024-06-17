'use client'
import { useState } from 'react'
import { HeaderSection } from '@/modules/admin'
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { FileData } from './sections'
import { IconUpload } from '@tabler/icons-react'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import { IPaymentTxt } from '@/types'

import { fetchGestor } from '@/api'
import { toast } from 'react-toastify'

interface IUpPayment {
  file: File[]
  data: IPaymentTxt[]
}

export const FrmImportPayments = () => {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleExit = () => {
    router.back()
  }

  const onSubmit = () => {
    setOpen(true)
  }

  const methods = useForm<IUpPayment>({
    defaultValues: {
      file: [],
      data: [],
    },
  })

  const handleFormSubmit: SubmitHandler<IUpPayment> = async (
    data: IUpPayment
  ) => {
    setOpen(false)
    setLoading(true)

    const newData = data.data

    try {
      const res = await fetchGestor('import_pagos/', {
        method: 'POST',
        body: JSON.stringify(newData),
      })
      const resData = res as {
        nuevos: string
        existentes: string
      }
      toast.success(
        <>
          <div className="flex flex-col gap-1 text-xs">
            <h3 className="text-sm font-bold">
              Archivos importados correctamente
            </h3>
            <div>
              <p>Archivos credos nuevos: {resData.nuevos}</p>
              <p>Archivos con coincidencias: {resData.existentes}</p>
            </div>
          </div>
        </>
      )
      router.back()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <Modal
        isOpen
        size="5xl"
        radius="sm"
        onClose={handleExit}
      >
        <ModalContent>
          <ModalHeader>
            <div className="w-full">
              <HeaderSection
                title="Importar pagos"
                subtitle="Subir archivo de pagos en formato .txt"
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-5"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <FileData />
                <footer className="flex gap-3 items-center justify-end pb-4 pt-4  ">
                  <Button
                    radius="sm"
                    onPress={handleExit}
                  >
                    Cancelar
                  </Button>
                  <Button
                    radius="sm"
                    className="button-dark"
                    type="submit"
                    startContent={<IconUpload />}
                    isLoading={loading}
                    isDisabled={loading}
                  >
                    Importar
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
