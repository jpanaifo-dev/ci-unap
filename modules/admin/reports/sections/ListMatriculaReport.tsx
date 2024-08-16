/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import { TableCustom, IColumns, IRows, useReports } from "@/modules/admin";
import { IProceeding } from "@/types";

const col: IColumns[] = [
  {
    key: "key",
    label: "Id",
    align: "center",
  },
  {
    key: "person",
    label: "Persona",
    align: "center",
  },
  {
    key: "email",
    label: "Correo",
    align: "center",
  },
  {
    key: "program",
    label: "Programa",
    align: "center",
  },
  {
    key: "situation",
    label: "Situación",
    align: "center",
  },
];

export const ListMatriculaReport = () => {
  const { listReports: data, getExpedientsReport, loading } = useReports();
  const [query, setQuery] = useState({ name: "" });

  useEffect(() => {
    getExpedientsReport(query);
  }, [query]);

  const proceedings: IProceeding[] = data || [];

  const rows: IRows[] = proceedings?.map((item) => {
    return {
      key: item.id,
      person: renderColumnPerson(item),
      email: item.persona.correo,
      program: item.programa.nombre,
      situation: !item.is_active
        ? "Inactivo"
        : item?.is_retirate
        ? "Retirado"
        : item?.is_graduated
        ? "Graduado"
        : "Activo",
    };
  });

  return (
    <>
      <h2 className="text-xl font-semibold py-3">
        Reporte de matrículas{" "}
        <span className="text-sm font-normal">
          {proceedings?.length} registros encontrados
        </span>
      </h2>
      <TableCustom
        placeholder="Buscar matrícula"
        columns={col}
        rows={rows || []}
        loading={loading}
        searchValue={query.name}
        onSearch={(value) => setQuery({ name: value })}
      />
    </>
  );
};

const renderColumnPerson = (item: IProceeding) => {
  return (
    <div className="flex flex-col gap-1 w-full">
      <p className="text-sm">{item?.persona?.nombres}</p>
      <div className="flex gap-1 items-center ">
        <p className="text-xs">{item?.persona?.apellido_paterno}</p>
        <p>{item?.persona?.apellido_materno}</p>
      </div>
    </div>
  );
};
