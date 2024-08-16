'use client'
import { useState } from 'react'
import { DrawerCustom } from '@/modules/admin'
import { IProceeding } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { ListPersons } from './ListPersons'

export const PersonData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<IProceeding>()

  const handleSelectPerson = (person: any) => {
    setValue('persona', person)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="persona"
        rules={{
          required: 'Seleccione un estudiante',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Students"
            label="Estudiante"
            labelPlacement="outside"
            placeholder="Seleccionar estudiante"
            radius="sm"
            variant="bordered"
            value={
              value
                ? `${value.nombres} ${value.apellido_paterno} ${value.apellido_materno}`
                : ''
            }
            onValueChange={onChange}
            description="Seleccione el estudiante al que pertenece el expediente"
            isRequired
            errorMessage={'Seleccione un estudiante'}
            readOnly={true}
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
        title="Seleccionar una persona"
        content={<ListPersons onSelectPerson={handleSelectPerson} />}
      />
    </>
  )
}
