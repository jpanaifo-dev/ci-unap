'use client'

import { Controller, useFormContext } from 'react-hook-form'
import { IChangePassword } from '@/types'
import { Input, Progress } from '@nextui-org/react'

// const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
const pattern = {
  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  message:
    'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un caracter especial',
}

type IColor = 'success' | 'warning' | 'danger'

function evaluatePassword(password: string): {
  color: IColor
  value: number
  message: string
} {
  let color = 'success' as IColor
  let value = 100
  let message = 'La contraseña es segura'

  if (password.length <= 8) {
    color = 'danger' as IColor
    value = 10
    message = 'La contraseña es muy débil'
  } else if (
    !/[A-Z]/.test(password) ||
    !/[0-9]/.test(password) ||
    !/[@$!%*?&]/.test(password)
  ) {
    color = 'warning' as IColor
    value = 60
    message = 'La contraseña es moderadamente debil'
  }

  return { color, value, message }
}

export const PasswordChange = () => {
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext<IChangePassword>()

  const progressData: {
    color: IColor
    value: number
    message: string
  } = evaluatePassword(watch('password') || '')

  return (
    <>
      <div className="flex flex-col gap-5 pt-3">
        {watch('password') && (
          <section className="flex flex-col gap-1">
            <Progress
              aria-label="Contraseña actual"
              color={progressData.color}
              value={progressData.value}
            />
            <p className="text-sm text-gray-500">{progressData.message}</p>
          </section>
        )}
        <Controller
          name="password"
          rules={{
            required: 'Ingresa tu nueva contraseña',
            pattern: pattern,
          }}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Contraseña actual"
              label="Contraseña actual"
              labelPlacement="outside"
              type="password"
              radius="sm"
              placeholder="Nueva contraseña"
              value={value || ''}
              onValueChange={onChange}
              isInvalid={errors.password !== undefined}
              errorMessage={errors.password?.message}
            />
          )}
        />
        <Controller
          name="password2"
          control={control}
          rules={{
            required: 'Ingresa tu nueva contraseña',
            pattern: pattern,
            validate: (value) =>
              value === watch('password') || 'Las contraseñas no coinciden',
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              aria-label="Nueva contraseña"
              label="Nueva contraseña"
              labelPlacement="outside"
              type="password"
              placeholder="Nueva contraseña"
              radius="sm"
              value={value || ''}
              onValueChange={onChange}
              isInvalid={errors.password2 !== undefined}
              errorMessage={errors.password2?.message}
            />
          )}
        />
      </div>
    </>
  )
}
