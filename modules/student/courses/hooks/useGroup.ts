'use client'

import { fetchGestor } from "@/api";
import { IResApi } from "@/types";
import { IGroup } from "@/types/languages/IGroup";
import { useState } from "react";

export const useStudentGroup = () => {
    const [listGroup, setListGroup] = useState<{
        count: number;
        results: IGroup[];
        next: string | null;
        previous: string | null;
    } | null>(null);

    const getGroup = async () => {
        const response = await fetchGestor("GrupoList/", { method: "GET" });
        if (response.detail) {
            throw new Error("Error al cargar los grupos");
        }
        const data: IResApi<IGroup> = response as IResApi<IGroup>;
        setListGroup(data);
    };

    const getGroupById = async (id: number) => {
        const response = await fetchGestor(`GrupoList/?id=${id}&is_active=true/`, { method: "GET" });
        if (response.detail) {
            throw new Error("Error al cargar el grupo");
        }
        const data: IResApi<IGroup> = response as IResApi<IGroup>;
        setListGroup(data);
    }

    return { listGroup, getGroup, getGroupById };
}
