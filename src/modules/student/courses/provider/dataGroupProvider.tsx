import React, { createContext, useState } from 'react'
import { IInscriptions } from '@/types'
// Definir el tipo de datos que se almacenarán en el proveedor
type DataGroup = {
  // Agrega aquí las propiedades que necesites
  id: number
  name: string
}

// Crear el contexto del proveedor
const DataGroupContext = createContext<DataGroup[]>([])

// Crear el componente del proveedor
const DataGroupProvider = ({ children }: { children: React.ReactNode }) => {
  // Definir el estado para almacenar los datos
  const [dataGroups, setDataGroups] = useState<DataGroup[]>([])

  // Agregar aquí las funciones para manipular los datos

  return (
    <DataGroupContext.Provider value={dataGroups}>
      {children}
    </DataGroupContext.Provider>
  )
}

export default DataGroupProvider
