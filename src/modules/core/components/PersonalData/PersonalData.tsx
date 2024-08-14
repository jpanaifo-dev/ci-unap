import { IPerson } from "@/types";

interface IProps {
  personData: IPerson;
}

export const PersonalData = (props: IProps) => {
  const {
    nombres,
    apellido_materno,
    apellido_paterno,
    fecha_nacimiento,
    sexo,
    tipo_documento,
    numero_documento,
    is_trabajador,
    ocupacion,
    estado_civil,
    lugar_nacimiento,
    pais,
    region,
    provincia,
    distrito,
  } = props.personData;

  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">Información personal</h2>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="font-bold">Nombres:</p>
            <p>{nombres}</p>
          </div>
          <div>
            <p className="font-bold">Apellidos:</p>
            <p>{`${apellido_paterno} ${apellido_materno}`}</p>
          </div>
          <div>
            <p className="font-bold">Fecha de nacimiento:</p>
            <p>{fecha_nacimiento}</p>
          </div>
          <div>
            <p className="font-bold">Sexo:</p>
            <p>{sexo?.toString() || ""}</p>
          </div>
          <div>
            <p className="font-bold">Tipo de documento:</p>
            <p>{tipo_documento.documento}</p>
          </div>
          <div>
            <p className="font-bold">Número de documento:</p>
            <p>{numero_documento}</p>
          </div>
          <div>
            <p className="font-bold">¿Es trabajador?</p>
            <p>{is_trabajador ? "Sí" : "No"}</p>
          </div>
          <div>
            <p className="font-bold">Ocupación:</p>
            <p>{ocupacion || "No definido"}</p>
          </div>
          <div>
            <p className="font-bold">Estado civil:</p>
            <p>{estado_civil?.estado || "No definido"}</p>
          </div>
          <div>
            <p className="font-bold">Lugar de nacimiento:</p>
            <p>{lugar_nacimiento || "No definido"}</p>
          </div>
          <div>
            <p className="font-bold">País:</p>
            <p>{pais || "No definido"}</p>
          </div>
          <div>
            <p className="font-bold">Región:</p>
            <p>{region || "No definido"}</p>
          </div>
          <div>
            <p className="font-bold">Provincia:</p>
            <p>{provincia || "No definido"}</p>
          </div>
          <div>
            <p className="font-bold">Distrito:</p>
            <p>{distrito || "No definido"}</p>
          </div>
        </div>
      </div>
    </>
  );
};
