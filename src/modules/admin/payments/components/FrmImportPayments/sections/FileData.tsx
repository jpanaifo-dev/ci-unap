/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'

//Test filepond
import { FilePond, registerPlugin } from 'react-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import 'filepond/dist/filepond.min.css'
// import { useRef } from 'react'
// import { Link } from '@nextui-org/react'
import { Controller, useFormContext } from 'react-hook-form'
registerPlugin(FilePondPluginFileValidateType)
import { IPaymentTxt } from '@/types'
import { IconLoader } from '@tabler/icons-react'

import { Readtxt } from '../ReadTxt'
import { Divider } from '@nextui-org/react'

interface IUpPayment {
  file: File[]
  data: IPaymentTxt[]
}

export const FileData = () => {
  const { control, watch, setValue } = useFormContext<IUpPayment>()
  const [pagos, setPagos] = useState<IPaymentTxt[]>([])
  const [loading, setLoading] = useState(false)

  const handleFileUpload = async (files: File[]) => {
    setLoading(true)
    if (files.length > 0) {
      const pagos = await Readtxt(files[0])
      setPagos(pagos as unknown as IPaymentTxt[])
      setValue('data', pagos as unknown as IPaymentTxt[])
    }
    setLoading(false)
  }

  useEffect(() => {
    handleFileUpload(watch('file'))
  }, [watch('file')])

  return (
    <>
      <Controller
        control={control}
        name="file"
        render={({ field: { value, onChange } }) => (
          <FilePond
            files={value}
            acceptedFileTypes={['text/plain']}
            allowMultiple={false}
            maxFiles={1}
            onupdatefiles={(fileItems) => {
              onChange(fileItems.map((fileItem) => fileItem.file))
            }}
          />
        )}
      />

      <main>
        {loading && (
          <section className="flex justify-center items-center h-24">
            <IconLoader
              size={32}
              className="text-gray-500 animate-spin"
            />
          </section>
        )}
        {!loading && (
          <>
            <section className="flex flex-col gap-3 items-center">
              <h1 className="uppercase font-bold">Pagos por procesar </h1>
              <Divider />
            </section>
            <main className="overflow-x-auto overflow-y-auto max-h-[calc(100vh-32rem)] overflow-auto">
              {pagos.length > 0 ? (
                <table className="w-full">
                  <thead className="sticky top-0 bg-white pb-5 border-b w-full">
                    <tr>
                      <th>#</th>
                      <th>Nombre Cliente</th>
                      <th>Número Documento</th>
                      <th>Número Operación</th>
                      <th>Fecha Operación</th>
                      <th>Monto</th>
                      <th>Concepto</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {pagos.map((pago, index) => (
                      <tr key={index}>
                        <td>{index + 1} </td>
                        <td>{pago.nombre_cliente}</td>
                        <td className="text-center">{pago.numero_documento}</td>
                        <td className="text-center">{pago.numero_operacion}</td>
                        <td className="text-center">{pago.fecha_operacion}</td>
                        <td className="text-center">{pago.monto}</td>
                        <td className="text-center">{pago.concepto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <section className="flex justify-center items-center h-24">
                  <p>No hay pagos para procesar.</p>
                </section>
              )}
            </main>
          </>
        )}
      </main>
    </>
  )
}
