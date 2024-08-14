/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import {
  TableCustom,
  IColumns,
  IRows,
  useReports,
} from "@/modules/admin";
import { IProceeding } from "@/types";
import { FilterExpedienteOptions } from "./FilterExpedienteOptions";
import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";
import { IconReport } from "@tabler/icons-react";

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
    key: "document",
    label: "Documento",
    align: "center",
  },
  {
    key: "situation",
    label: "Situación",
    align: "center",
  },
  {
    key: "program",
    label: "Programa",
    align: "center",
  },
];

export const ListExpedientReport = () => {
  const { listReports: data, getExpedientsReport, loading } = useReports();

  const [query, setQuery] = useState({
    id: "",
    name: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    numeroDocumento: "",
    programaNombre: "",
    isActive: undefined,
  });

  useEffect(() => {
    getExpedientsReport(query);
  }, [query]);

  const proceedings: IProceeding[] = data || [];

  const rows: IRows[] = proceedings?.map((item) => {
    return {
      key: item.id,
      person: renderColumnPerson(item),
      discount: item.descuento ? "Sí" : "No",
      situation: item.is_active ? "Activo" : "Inactivo",
      document: item.persona.numero_documento,
      program: item.programa.nombre,
    };
  });

  const transformDataForExcel = (data: IProceeding[]) => {
    return data.map(item => [
      item.id,
      item.persona.nombres,
      item.persona.apellido_paterno,
      item.persona.apellido_materno,
      item.persona.numero_documento,
      item.is_active ? "Activo" : "Inactivo",
      item.programa.nombre,
    ]);
  };


  const handleExport = async () => {
    const excelData = transformDataForExcel(proceedings);

    const header = [
      "N° expediente",
      "Nombres",
      "Primer Apellido",
      "Segundo Apellido",
      "N° Documento",
      "Situación",
      "Programa",
    ]

    const requestBody = {
      header,
      data: excelData
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      toast.success('Exportando reporte...')

      const response = await fetch('http://192.168.16.184:8000/api/reporte/get_report/', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      } else if (response.status === 204) {
        throw new Error("No data found for the report");
      }

      const report = await response.json();

      if (report.path) {
        // Descargar el archivo desde la URL proporcionada
        const a = document.createElement('a');
        a.href = report.path;
        a.download = 'reporte.xlsx';
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast.success('Reporte exportado exitosamente')

      } else {
        throw new Error("La respuesta no contiene la ruta del archivo");
      }

    } catch (error) {
      console.error("There was an error exporting the report", error);
      toast.error('Error al exportar el reporte')
    }

  }

  return (
    <>
      <h2 className="text-xl font-semibold py-3">
        Reporte de expedientes{" "}
        <span className="text-sm font-normal">
          {proceedings?.length} registros encontrados
        </span>
      </h2>
      <section className="flex gap-2 w-full">
        <div className="flex w-full">
          <FilterExpedienteOptions query={query} setQuery={setQuery} />
        </div>
        <div className="w-1/2 flex justify-end">
          <Button className="button-dark"
            aria-label="button"
            radius="sm"
            size="sm"
            startContent={<IconReport size={16} className="text-white" />}
            onPress={handleExport}>
              Exportar
          </Button>
        </div>
      </section>
      <TableCustom
        placeholder="Buscar expediente"
        columns={col}
        rows={rows || []}
        loading={loading}
        searchValue={query.name}
        onSearch={(value) => setQuery({ ...query, name: value })}
        disableInputSearch={true}
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
