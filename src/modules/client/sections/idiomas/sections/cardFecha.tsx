import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/react";
import { IconBrandWhatsapp, IconMail, IconPhone } from "@tabler/icons-react";

export const CardFecha = () => {
  return (
    <div className="w-full h-[415px] bg-white flex-col justify-start items-start gap-[23px] inline-flex">
      <div className="self-stretch h-[139px] flex-col justify-start items-center gap-[26px] flex">
        <div className="self-stretch px-6 py-2 bg-yellow-500 justify-start items-center gap-2.5 inline-flex">
          <div className="grow shrink basis-0 text-center text-slate-50 text-[32px] font-medium">
            Inicio de clases
          </div>
        </div>
        <div className="justify-start items-center gap-4 inline-flex">
          <div className="text-center text-slate-950 text-5xl font-bold">
            20{" "}
          </div>
          <div className="w-28 text-slate-950 text-xl font-bold">
            DICIEMBRE
          </div>
        </div>
      </div>
      <Divider />
      <div className="self-stretch  flex-col justify-start items-center gap-6 flex">
        <div className="text-center text-slate-950 text-[32px] font-semibold">
          Informes
        </div>
        <div className="flex-col justify-start items-start gap-4 flex">
          <div className="justify-start items-center gap-4 inline-flex">
            <div className="w-6 h-6 relative" >
               <IconBrandWhatsapp size={24} />
            </div>
            <div className="text-center text-slate-950 text-base font-medium">
              +51 966875412
            </div>
          </div>
          <div className="justify-start items-center gap-4 inline-flex">
            <div className="w-6 h-6 relative" >
              <IconPhone size={24} />
            </div>
            <div className="text-center text-slate-950 text-base font-medium">
              +51 966875412
            </div>
          </div>
          <div className="justify-start items-center gap-4 inline-flex">
            <div className="w-6 h-6 relative" >
              <IconMail size={24} />
            </div>
            <div className="text-center text-slate-950 text-base font-medium">
              +51 966875412
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch h-10 px-6 flex-col justify-start items-start gap-2.5 flex">
        <Button
          className="w-full rounded-md"
          color="danger"
          variant="bordered"
          size="lg"
        >
            Deseo más información
        </Button>
      </div>
    </div>
  );
};
