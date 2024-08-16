'use client'
import { useState } from 'react'
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form'
import { Button } from '@nextui-org/button'
import { toast } from 'react-toastify'

import { fetchCore } from '@/api'
import { IPerson, IResCookie } from '@/types'
import { PasswordChange } from './PasswordChange'
import { DialogAction } from '@/components'
import { getCookie } from '@/utils'

const appName = process.env.APP_NAME

export const FrmChangePassword = () => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const methods = useForm<IPerson>({})

  const isChanged = methods.formState.isDirty

  const onSubmit = () => {
    setOpen(true)
  }

  const handleSubmit: SubmitHandler<IPerson> = async (data) => {
    setOpen(false)
    setLoading(true)

    const resCookie: IResCookie = (await getCookie(
      `${appName}_persona_id`
    )) as IResCookie

    const persona_id = resCookie.value

    const res = await fetchCore('accounts/change_password/', {
      method: 'POST',
      body: JSON.stringify({ ...data, person_id: persona_id }),
    })

    if (res.ok) {
      toast.success(
        <section className="flex flex-col gap-1">
          <h1 className="font-bold text-sm">
            Se ha cambiado la contraseña correctamente
          </h1>
          <p className="text-gray-500 text-xs">
            Recuerda que al cambiar tu contraseña, esa será la nueva contraseña
            al iniciar sesión en la plataforma.
          </p>
        </section>
      )
      methods.reset()
    } else {
      toast.error('No se pudo cambiar la contraseña')
    }

    setLoading(false)
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        <section>
          <h2 className="text-lg font-bold">Cambiar contraseña</h2>
          <p className="text-sm text-gray-500">
            Recuerda que al cambiar tu contraseña, esa será la nueva contraseña
            al iniciar sesión en la plataforma.
          </p>
        </section>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-5"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <PasswordChange />
            <footer className="flex justify-end gap-2">
              <Button radius="sm">Cancelar</Button>
              <Button
                radius="sm"
                className="button-dark"
                type="submit"
                isDisabled={loading || !isChanged}
                isLoading={loading}
              >
                Guardar
              </Button>
            </footer>
          </form>
        </FormProvider>
      </div>
      <DialogAction
        isOpen={open}
        setOpen={setOpen}
        title="Cambiar contraseña"
        message="¿Estás seguro de que deseas cambiar tu contraseña?"
        onPress={methods.handleSubmit(handleSubmit)}
      />
    </>
  )
}
