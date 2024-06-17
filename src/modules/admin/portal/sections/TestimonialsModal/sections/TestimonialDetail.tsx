import { ITestimony } from "@/types";
import { converDate } from "@/utils";
import { Input } from "@nextui-org/react";

export const TestimonialDetail = ({
    defaulData,
    }: {
    defaulData: ITestimony;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Input type="date" value={converDate(defaulData?.fecha)} readOnly label='Fecha' labelPlacement="outside" radius="sm" />
      </div>
      <div className="flex flex-col gap-2">
        <Input type="text" value={
          defaulData?.persona?.nombres +
          " " +
          defaulData?.persona?.apellido_paterno +
          " " +
          defaulData?.persona?.apellido_materno
        } readOnly label='Autor' labelPlacement="outside" radius="sm" />
      </div>
    </div>
  );
};
