import { IPerson } from "@/types";

export const TeacherDetail = ({ teacher }: { teacher: IPerson | null }) => {
  return (
    <div>
      <div className="space-y-1">
        {teacher && (
          <>
            <h2 className="text-black text-xl font-bold">
              Detalles del docente
            </h2>
            <p>{teacher?.pais ? teacher?.pais : ""}</p>
            <p className="text-base">
              {teacher?.nombres +
                " " +
                teacher?.apellido_paterno +
                " " +
                teacher?.apellido_materno}
            </p>
            <span>{teacher?.sexo === "M" ? "Profesor" : "Profesora"}</span>
            <p className="text-base">
              {teacher?.correo} - {teacher?.celular}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
