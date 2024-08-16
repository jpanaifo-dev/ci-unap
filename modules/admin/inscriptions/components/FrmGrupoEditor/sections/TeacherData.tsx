'use client'
import { useState } from 'react'
import { IGroup } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerCustom } from '@/modules/admin'
import { TeacherList } from './TeacherList'

export const TeacherData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IGroup>()

  const handleSelectTeacher = (teacher: any) => {
    setValue('docente', teacher)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="docente"
        rules={{
          required: 'Seleccione un módulo',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Teacher"
            label="Profesor"
            labelPlacement="outside"
            placeholder="Seleccionar un profesor"
            radius="sm"
            variant="bordered"
            value={value?.full_name ?? ''}
            onValueChange={onChange}
            isRequired
            errorMessage="Seleccione un profesor"
            endContent={
              <div>
                <Button
                  size="sm"
                  radius="sm"
                  startContent={<IconLink size={16} />}
                  onPress={() => setIsOpen(true)}
                >
                  Seleccionar
                </Button>
              </div>
            }
          />
        )}
      />

      <DrawerCustom
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Seleccionar profesor"
        content={<TeacherList onSelectTeacher={handleSelectTeacher} />}
      />
    </>
  )
}
