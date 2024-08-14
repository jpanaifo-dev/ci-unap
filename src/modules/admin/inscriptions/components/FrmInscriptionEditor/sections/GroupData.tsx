import { useState } from 'react'
import { IInscriptions } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerCustom } from '@/modules/admin'
import { ListGroup } from './ListGroup'

export const GroupData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<IInscriptions>()

  const handleSelectProgram = (grupo: any) => {
    console.log(grupo)
    setValue('grupo', grupo)
    setIsOpen(false)
  }

  const matricula = watch('matricula')

  return (
    <>
      <Controller
        control={control}
        name="grupo"
        rules={{
          required: 'Seleccione un programa',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Group"
            label="Grupo"
            labelPlacement="outside"
            placeholder="Seleccione un grupo del curso"
            radius="sm"
            variant="bordered"
            value={value?.grupo ?? ''}
            onValueChange={onChange}
            isInvalid={errors.grupo !== undefined}
            errorMessage={errors.grupo?.message as string}
            description="Grupo al que pertenecerá el alumno"
            isDisabled={!matricula}
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
        title="Seleccionar grupo"
        content={<ListGroup onSelectProgram={handleSelectProgram} />}
      />
    </>
  )
}
