'use client'
import { useState } from 'react'
import { Button, Chip, Divider } from '@nextui-org/react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import { UserGroups } from './UserGroups'
import { fetchCore } from '@/api'
import { IPerson } from '@/types'

interface IGroupForm {
  roles: Array<string>
}

function parseToGroups(groups: Array<number> | undefined): Array<string> {
  if (!groups) return []
  return groups.map((group) => String(group))
}

export const UserData = (props: { person: IPerson }) => {
  const [loading, setLoading] = useState(false)

  const {
    person: { user },
  } = props
  const router = useRouter()

  const title = user ? 'Detalles de usuario' : 'Usuario no asignado'
  const description = user
    ? 'Detalles del usuario, creación, actualización y roles asignados. (Selecciona los roles para asignar a esta persona)'
    : 'Selecciona los roles que deseas asignar a esta persona y crea un usuario.'

  const methods = useForm<IGroupForm>({
    defaultValues: {
      roles: parseToGroups(user?.groups),
    },
  })

  const {
    formState: { isDirty },
  } = methods

  const onSubmit: SubmitHandler<IGroupForm> = async (data) => {
    setLoading(true)
    const res = await fetchCore('accounts/create_user/', {
      method: 'POST',
      body: JSON.stringify({
        person_id: props.person.id,
        grupos: data.roles,
      }),
    })

    if (res.ok) {
      toast.success(
        <section className='flex flex-col gap-2'>
          <h1 className="text-sm font-bold">
            Roles actualizados correctamente
          </h1>
          <p className="text-tiny text-gray-500">
            Los roles han sido asignados correctamente a{' '}
            {props.person.nombres +
              ' ' +
              props.person.apellido_paterno +
              ' ' +
              props.person.apellido_materno}
          </p>
        </section>
      )
      handleExit()
    } else {
      toast.error('Ocurrió un error al actualizar los roles')
    }
    setLoading(false)
  }

  const handleExit = () => {
    router.back()
  }

  return (
    <section className="w-full flex flex-col gap-3">
      <header className="w-full">
        <h1 className="text-lg font-bold">{title}</h1>
        <p className="text-sm text-gray-500">{description}</p>
      </header>
      <Divider />
      {user && (
        <main className="w-full flex flex-col gap-4">
          <section className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <Chip
                size="sm"
                radius="sm"
                color={user.is_active ? 'success' : 'danger'}
                variant="flat"
              >
                {user.is_active ? 'Activo' : 'Inactivo'}
              </Chip>
              <h1 className="text-lg font-bold">{user.username}</h1>
            </div>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </section>
          <section className="flex flex-col gap-5">
            <header>
              <h1 className="font-bold text-gray-500">
                Roles{' '}
                <span className="font-normal">
                  | Roles asignados: {user.groups.length}{' '}
                </span>
              </h1>
              <p className="text-sm text-gray-500">
                {`(`}Los roles seleccionados son los que se asignarán a esta
                persona | Si deseas asignar roles, selecciona presiona el botón
                Asignar roles {`)`}
              </p>
            </header>
          </section>
        </main>
      )}
      {user === null && <main className="w-full"></main>}
      <section>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3 w-full"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <UserGroups />
            <footer className="flex items-center justify-end gap-3">
              {isDirty && (
                <Button
                  size="sm"
                  radius="sm"
                  onPress={() => methods.reset()}
                >
                  Cancelar
                </Button>
              )}
              <Button
                size="sm"
                className="button-dark"
                radius="sm"
                type="submit"
                isDisabled={!isDirty || loading}
                isLoading={loading}
              >
                {user ? 'Actualizar roles' : 'Asignar roles y crear usuario'}
              </Button>
            </footer>
          </form>
        </FormProvider>
      </section>
    </section>
  )
}
