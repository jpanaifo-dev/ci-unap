'use client'
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form'
import { Button, Divider, Image, Input } from '@nextui-org/react'
import Link from 'next/link'
import { IAuthUser, ICredentials } from '@/types'
import { useState } from 'react'
import { fetchCore } from '@/api'

const app_name = process.env.APP_NAME

//To alert
import { toast } from 'react-toastify'

//Eliminar cuando se agrega la funcion auth
import { useRouter } from 'next/navigation'
import { createCookie, redirectToRoleUrl } from '@/utils'

export const FrmLogin = () => {
  const [isLoading, setIsLoading] = useState(false)
  const methods = useForm<ICredentials>()

  // Eliminar cuando se agrega la funcion auth
  const router = useRouter()

  const onSubmit: SubmitHandler<ICredentials> = async (data) => {
    setIsLoading(true)

    const response = await fetchCore('accounts/login/', {
      method: 'POST',
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const dataRes: IAuthUser = (await response.json()) as IAuthUser

      const cookieData = {
        token: dataRes.token,
        user: JSON.stringify(dataRes.user),
        persona_id: dataRes.persona_id,
        persona_nombres: dataRes.persona_nombres,
        groups: JSON.stringify(dataRes.groups),
        permissions: dataRes.permissions,
        is_superuser: dataRes.user.is_superuser,
        is_staff: dataRes.user.is_staff,
        is_active: dataRes.user.is_active,
        last_login: dataRes.user.last_login,
        username: dataRes.user.username,
        email: dataRes.user.email,
      }

      const cookieValue = await JSON.stringify(cookieData)

      await createCookie(`${app_name}_user`, cookieValue)

      toast.success(
        <div>
          <p className="text-xs text-gray-500">Bienvenido</p>
          <h3 className="text-sm font-medium">{dataRes.persona_nombres}</h3>
        </div>
      )
      await router.push(redirectToRoleUrl(dataRes.groups).link)
      clearFields()
    } else {
      toast.error(
        <>
          <p className="font-bold">
            {'Usuario o contraseña incorrectos. Intente de nuevo.'}
          </p>
        </>
      )
    }

    setIsLoading(false)
  }

  const clearFields = () => {
    methods.setValue('email', '')
    methods.setValue('password', '')
  }

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="flex flex-col gap-6 w-full max-w-sm"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            name="email"
            rules={{
              required: 'Ingrese su usuario',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="user"
                label="Usuario"
                placeholder="Name or Email"
                radius="sm"
                variant="bordered"
                labelPlacement="outside"
                value={value || ''}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.email !== undefined}
                errorMessage={methods.formState.errors.email?.message}
              />
            )}
          />

          <Controller
            control={methods.control}
            name="password"
            rules={{
              required: 'Ingrese su contraseña',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                aria-label="password"
                label="Contraseña"
                placeholder="********"
                radius="sm"
                variant="bordered"
                labelPlacement="outside"
                type="password"
                value={value || ''}
                onValueChange={onChange}
                isInvalid={methods.formState.errors.password !== undefined}
                errorMessage={methods.formState.errors.password?.message}
              />
            )}
          />

          <header className="flex flex-col gap-6">
            <div>
              <div className="flex justify-end pb-2">
                <Link
                  href="/forgot-password"
                  className="text-sm text-success-700 underline hover:text-success-800"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Button
                fullWidth
                radius="sm"
                className="bg-black text-white hover:bg-gray-800 "
                type="submit"
                isLoading={isLoading}
              >
                Iniciar sesión
              </Button>
            </div>
            <Divider />
            <Button
              fullWidth
              radius="sm"
              variant="light"
              startContent={
                <div>
                  <Image
                    width={24}
                    height={24}
                    src="https://img.icons8.com/color/48/google-logo.png"
                    alt="google-logo"
                    fetchPriority="high"
                  />
                </div>
              }
            >
              Iniciar sesión con Google
            </Button>
          </header>
        </form>
      </FormProvider>
    </>
  )
}
