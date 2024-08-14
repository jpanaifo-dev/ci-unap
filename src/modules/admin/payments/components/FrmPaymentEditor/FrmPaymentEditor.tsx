'use client'
import { useState } from 'react'
import { HeaderSection, LayoutFrmHorizontal } from '@/modules/admin'
import { IPayments } from '@/types'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { DialogAction } from '@/components'
import { ExpedienteData, InfoData, PaymentsConceptsData } from './sections'
import { fetchCore } from '@/api'

//To alert
import { toast } from 'react-toastify'

interface IProps {
  dataDeafult?: IPayments
}

export const FrmPaymentEditor = (props: IProps) => {
  const { dataDeafult } = props
  const router = useRouter()

  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPayments>({
    defaultValues: dataDeafult,
  })

  const onSubmit = () => {
    setOpen(true)
  }

  const handleFormSubmit: SubmitHandler<IPayments> = async (
    data: IPayments
  ) => {
    setLoading(true)
    setOpen(false)
    if (dataDeafult?.id) {
      const res = await fetchCore(`gestor/Pago/${data.id}/`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 200) {
        toast.success('Pago actualizado correctamente')
        router.push('/admin/pagos/conceptos')
        router.refresh()
      } else {
        toast.error('Error al actualizar el pago')
      }
    } else {
      const res = await fetchCore('gestor/Pago/', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((res) => res)
        .catch((err) => err)
      if (res.status === 201) {
        toast.success('Pago guardado correctamente')
        router.push('/admin/pagos/conceptos')
        router.refresh()
      } else {
        toast.error('Error al guardar el pago')
      }
    }
    setLoading(false)
  }

  //For title
  const title = dataDeafult ? 'Editar pago' : 'Agregar pago'

  const subtitle = dataDeafult
    ? 'Modifica los datos del pago'
    : 'Completa los datos del nuevo pago'

  const handleExit = () => {
    router.push('/admin/pagos')
  }

  return (
    <>
      <main className="w-full flex flex-col items-center">
        <section className="flex flex-col gap-4 section-panel w-full  max-w-5xl">
          <HeaderSection
            title={title}
            subtitle={subtitle}
          />
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className="flex flex-col gap-5"
            >
              <LayoutFrmHorizontal
                title="Información del pago"
                subtitle="Completa los datos del pago"
              >
                <InfoData />
              </LayoutFrmHorizontal>

              <LayoutFrmHorizontal
                title="Conceptos de pago y expediente"
                subtitle="Datos del concepto de pago y expediente"
              >
                <section className="flex flex-col gap-5">
                  <PaymentsConceptsData />
                  <ExpedienteData />
                </section>
              </LayoutFrmHorizontal>

              <footer className="flex items-center gap-3 justify-end">
                <Button
                  className="button-dark"
                  radius="sm"
                  type="submit"
                  isLoading={loading}
                  isDisabled={loading}
                >
                  {dataDeafult?.id ? 'Actualizar' : 'Guardar'}
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
        </section>
      </main>
      <DialogAction
        isOpen={isOpen}
        title="Guardar cambios"
        message="¿Estás seguro de guardar los cambios?"
        setOpen={setOpen}
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  )
}
