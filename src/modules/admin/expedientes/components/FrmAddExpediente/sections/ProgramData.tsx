import { useState } from 'react'
import { IProceeding } from '@/types'
import { Button, Input } from '@nextui-org/react'
import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { DrawerCustom } from '@/modules/admin'
import { ListPrograms } from './ListPrograms'

export const ProgramData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IProceeding>()

  const handleSelectProgram = (program: any) => {
    setValue('programa', program)
    setIsOpen(false)
  }

  return (
    <>
      <Controller
        control={control}
        name="programa"
        rules={{
          required: 'Seleccione un programa',
        }}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Program"
            label="Programa"
            labelPlacement="outside"
            placeholder="Seleccionar programa"
            radius="sm"
            variant="bordered"
            value={value?.nombre}
            onValueChange={onChange}
            isInvalid={errors.programa !== undefined}
            errorMessage={errors.programa?.message as string}
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
        title="Seleccionar programa"
        content={<ListPrograms onSelectProgram={handleSelectProgram} />}
      />
    </>
  )
}
