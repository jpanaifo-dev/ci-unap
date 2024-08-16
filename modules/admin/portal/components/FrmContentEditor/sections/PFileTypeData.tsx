'use client'
import { useEffect, useState } from 'react'
import { IPublicationFileList } from '@/types'
import { Select, SelectItem } from '@nextui-org/react'
// import { IconLink } from '@tabler/icons-react'
import { useFormContext, Controller } from 'react-hook-form'
import { usePublicationsFilesTypes } from '../../../hooks'
// import { ListExpedientes } from './PFileTypeList'

export const PFileTypeData = () => {
  // const [isOpen, setIsOpen] = useState(false)
  const { control } = useFormContext<IPublicationFileList>()

  const [search, setSearch] = useState('')
  const { getPublicationsFilesTypes, listPublicationsFileType, loading } =
    usePublicationsFilesTypes()

  useEffect(() => {
    getPublicationsFilesTypes({
      page: 1,
      nombre__icontains: search,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const dataList = listPublicationsFileType?.results || []

  // const handleSelectValue = (value: any) => {
  //   setValue('tipo', value)
  //   setIsOpen(false)
  // }

  return (
    <>
      <Controller
        control={control}
        name="tipo"
        rules={{
          required: 'Selecione un nivel',
        }}
        render={({ field: { value, onChange } }) => (
          <Select
            aria-label="File type"
            label="Tipo de archivo"
            labelPlacement="outside"
            placeholder="Seleccione el tipo de archivo"
            radius="sm"
            variant="bordered"
            selectedKeys={[String(value.id)] || ['']}
            defaultSelectedKeys={['1']}
            disallowEmptySelection
            onChange={onChange}
            isLoading={loading}
            // isInvalid={errors.tipo_id !== undefined}
            // errorMessage={errors.tipo_id?.message as string}
            isRequired
            errorMessage="Seleccione un tipo de archivo"
          >
            {dataList.map((item) => (
              <SelectItem
                key={item.id}
                value={String(item.id)}
              >
                {item.nombre}
              </SelectItem>
            ))}
          </Select>
        )}
      />
      {/* <Controller
        control={control}
        name="tipo"
        rules={{
          required: 'Seleccione un tipo de publicación',
        }}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="tipo"
            label="Tipo de publicación"
            labelPlacement="outside"
            placeholder="Seleccione un tipo de publicación"
            radius="sm"
            variant="bordered"
            value={value.nombre ?? ''}
            onChange={onChange}
            isInvalid={errors.tipo !== undefined}
            errorMessage={errors.tipo?.message as string}
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
      /> */}
      {/* <DrawerCustom
        isOpen={isOpen}
        setOpen={setIsOpen}
        title="Seleccionar tipo de publicación"
        content={<ListExpedientes onSelectExp={handleSelectValue} />}
      /> */}
    </>
  )
}
