import { fetchCore } from '@/api'
import { ITypePayments, IPaymentTxt, IResApi } from '@/types'

const UseConceptoStore = () => {
  let conceptosCache: ITypePayments[] = []

  const getPaymentsConcepts = async () => {
    if (conceptosCache.length > 0) {
      return conceptosCache
    }
    const res = await fetchCore('gestor/Concepto/', { method: 'GET' })
    if (!res.ok) {
      return []
    }
    const resParse = (await res.json()) as IResApi<ITypePayments>
    conceptosCache = (resParse?.results as ITypePayments[]) || []

    return conceptosCache
  }

  const get_concepto_by_codigo = (
    codigo: string,
    conceptosCache: ITypePayments[]
  ) => {
    return (
      conceptosCache.find((concepto) => concepto.codigo === String(codigo)) ||
      null
    )
  }

  return {
    getPaymentsConcepts,
    get_concepto_by_codigo,
  }
}

const conceptoStore = UseConceptoStore()

export const Readtxt = async (file: File): Promise<IPaymentTxt[]> => {
  try {
    const fun = () => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = function () {
          const text = reader.result as string
          resolve(text)
        }
        reader.readAsText(file)
      })
    }

    const res = await fun()
    const pagos = res.split('\n')

    // Obtén todos los conceptos de pago de una vez
    const conceptos = await conceptoStore.getPaymentsConcepts()

    const pagosModel: IPaymentTxt[] = pagos
      .map((pago: string) => {
        let codigo_concepto = pago.slice(35, 43)
        codigo_concepto = codigo_concepto.replace(/^0+/, '')
        const condicion = pago.slice(112, 113)
        let monto_str = pago.slice(62, 77)
        let decimales = ''
        decimales = monto_str.slice(13, 15)[0]
        monto_str = monto_str.slice(1, 13)
        monto_str = `${monto_str}.${decimales}`
        const monto = parseFloat(monto_str)
        const concepto = conceptoStore.get_concepto_by_codigo(
          codigo_concepto,
          conceptos
        )
        if (concepto && Number(condicion) === 2) {
          let numero_documento = pago.slice(47, 62).trim().slice(7, 15)
          let nombre_cliente = pago.slice(121, 156).trim()
          let fecha_operacion = pago.slice(79, 87)
          const anio = fecha_operacion.slice(0, 4)
          const mes = fecha_operacion.slice(4, 6)
          const dia = fecha_operacion.slice(6, 8)
          fecha_operacion = `${anio}-${mes}-${dia}`
          const numero_operacion = pago.slice(18, 25)

          const pagoModel: IPaymentTxt = {
            nombre_cliente,
            numero_documento,
            numero_operacion,
            fecha_operacion,
            monto: monto,
            concepto: concepto.id,
          }

          return pagoModel
        }
        return null
      })
      .filter((pago) => pago !== null) as IPaymentTxt[]

    return pagosModel
  } catch (error) {
    alert(error)
    return []
  }
}
