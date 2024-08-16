/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Checkbox, CheckboxGroup, cn } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { useRoles } from '@/modules/admin'
import { useEffect } from 'react'

interface IGroupForm {
  roles: Array<string>
}

export const UserGroups = () => {
  const { control } = useFormContext<IGroupForm>()
  const { listRoles, getRoles } = useRoles()

  useEffect(() => {
    getRoles()
  }, [])

  return (
    <>
      <Controller
        control={control}
        name="roles"
        render={({ field: { value, onChange } }) => (
          <CheckboxGroup
            aria-label="roles"
            value={value}
            onValueChange={onChange}
          >
            {listRoles?.map((role) => (
              <Checkbox
                aria-label="roles"
                key={role.id}
                value={String(role.id) || ''}
                classNames={{
                  base: cn(
                    'hover:bg-content2 items-center justify-start w-full min-w-full',
                    'cursor-pointer rounded-lg gap-2 p-4 mb-1 border-2 border-transparent',
                    'data-[selected=true]:border-primary'
                  ),
                  label: 'w-full',
                }}
                className="w-full"
              >
                <div className="w-full">
                  <h1>{role.name}</h1>
                </div>
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
    </>
  )
}
