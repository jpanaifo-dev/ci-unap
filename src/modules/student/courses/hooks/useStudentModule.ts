'use client'

import { fetchGestor } from "@/api";
import { IModule, IResApi } from "@/types";
import { useState } from "react";

export const useStudentModule = () => {
    const [listModules, setModules] = useState<{
        count: number;
        results: IModule[];
        next: string | null;
        previous: string | null;
    } | null>(null);

    const getModules = async () => {
        const response = await fetchGestor("ModuloList/", { method: "GET" });
        if (response.detail) {
            throw new Error("Error al cargar los modulos");
        }
        const data: IResApi<IModule> = response as IResApi<IModule>;
        setModules(data);
    };

    const getModulesById = async (id: number) => {
        const response = await fetchGestor(`Modulo/?nombre__icontains=&modalidad__programa__id=&modalidad__programa__nombre=&modalidad__nombre=&id=${id}`, { method: "GET" });
        if (response.detail) {
            throw new Error("Error al cargar los modulos");
        }
        const data: IResApi<IModule> = response as IResApi<IModule>;
        setModules(data);
    }

    return { listModules, getModules, getModulesById };
}