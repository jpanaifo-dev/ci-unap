'use client'
import { Checkbox } from '@nextui-org/react'
import { IGroup } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { RadioStatus } from '@/modules/core'

export const ActionData = () => {
  const { control } = useFormContext<IGroup>()

  return (
    <>
      <Controller
        control={control}
        name="is_active"
        render={({ field: { onChange, value } }) => (
          <RadioStatus
            value={value}
            onChange={onChange}
          />
        )}
      />
    </>
  )
}
