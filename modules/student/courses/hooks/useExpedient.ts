'use client'
import { fetchGestor } from '@/api'
import { IModule, IPerson, IResApi } from '@/types'
import { useState } from 'react'

interface Expediente {
  id: number
  is_active: boolean
  is_retired: boolean
  is_graduated: boolean
  persona: IPerson
  programa: IModule
  descuento: any | null // Ajustar según la definición real de 'descuento'
}

export const useStudentExpedient = () => {
  // const [listExpedient, setListExpedient] = useState<{
  //   count: number;
  //   results: Expediente[];
  //   next: string | null;
  //   previous: string | null;
  // } | null>(null);
  // const getExpedient = async () => {
  //   const response = await fetchGestor("Expediente/", { method: "GET" });
  //   if (response.detail) {
  //     throw new Error("Error al cargar los expedientes");
  //   }
  //   const data: IResApi = response as IResApi;
  //   setListExpedient(data);
  // };
  // const getExpedientByStudent = async (id: number) => {
  //   const response = await fetchGestor(`Expediente/?estudiante=${id}`, {
  //     method: "GET",
  //   });
  //   if (response.detail) {
  //     throw new Error("Error al cargar los expedientes");
  //   }
  //   const data: IResApi = response as IResApi;
  //   setListExpedient(data.results);
  // };
  // return { listExpedient, getExpedient, getExpedientByStudent };
}
