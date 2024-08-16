/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { TableCustom, IColumns, IRows } from '@/modules/admin'
import { IPayments, IResApi } from '@/types'

const col: IColumns[] = [
  {
    key: 'key',
    label: 'Id',
    align: 'center',
  },
  {
    key: 'name_client',
    label: 'Nombre del cliente',
    align: 'center',
  },
  {
    key: 'numberDocument',
    label: 'Número de documento',
    align: 'center',
  },
  {
    key: 'numberOperacion',
    label: 'Número de operación',
    align: 'center',
  },
  {
    key: 'fecha',
    label: 'Fecha',
    align: 'center',
  },
  {
    key: 'concepto',
    label: 'Concepto de pago',
    align: 'center',
  },
  {
    key: 'monto',
    label: 'Monto',
    align: 'center',
  },
]

interface IProps {
  payments: IResApi<IPayments>
}

export const PaymentsDetails = (props: IProps) => {
  const { payments } = props

  const listPayments: IPayments[] = payments?.results || []

  const rows: IRows[] = listPayments?.map((item) => {
    return {
      key: item.id,
      name_client: item?.nombre_cliente,
      numberDocument: item?.num_documento,
      numberOperacion: item?.num_operacion,
      fecha: item?.fecha_operacion,
      concepto: item?.concepto?.concepto,
      monto: 'S/. ' + item?.concepto?.monto,
    }
  })

  return (
    <main className="flex flex-col gap-3">
      <header>
        <h1 className="text-gray-500 font-bold">Detalles de los pagos</h1>
      </header>
      <TableCustom
        columns={col}
        rows={rows || []}
        // pagination={{
        //   count: payments?.count || 0,
        // //   page: payments?.page || 1,
        // }}
      />
    </main>
  )
}
