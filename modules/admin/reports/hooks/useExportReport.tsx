import { IProceeding } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";

const transformDataForExcel = (data: IProceeding[]) => {
  return data.map(item => ({
    id: item.id,
    nombres: item.persona.nombres,
    apellido_paterno: item.persona.apellido_paterno,
    apellido_materno: item.persona.apellido_materno,
    numero_documento: item.persona.numero_documento,
    situacion: item.is_active ? "Activo" : "Inactivo",
    programa: item.programa.nombre,
  }));
};

export const useExportReport = (proceedings: IProceeding[]) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    const excelData = transformDataForExcel(proceedings);

    const header = [
      "N° expediente",
      "Nombres",
      "Primer Apellido",
      "Segundo Apellido",
      "N° Documento",
      "Situación",
      "Programa",
    ];

    const requestBody = {
      header,
      data: excelData
    };

    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      toast.success('Exportando reporte...');

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

        toast.success('Reporte exportado exitosamente');
      } else {
        throw new Error("La respuesta no contiene la ruta del archivo");
      }

    } catch (error) {
      console.error("There was an error exporting the report", error);
      toast.error('Error al exportar el reporte');
    } finally {
      setLoading(false);
    }
  };

  return { handleExport, loading };
};
