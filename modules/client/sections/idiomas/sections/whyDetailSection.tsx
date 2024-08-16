import { Button, Image } from "@nextui-org/react";
import { imgLangDetail } from "@/assets/images";
import {
  IconSchool,
  IconCertificate,
  IconStars,
  IconUserScreen,
} from "@tabler/icons-react";
const dataServices = [
  {
    id: 1,
    name: "Docentes experimentados",
    icon: <IconSchool color="#ffff" />,
  },
  {
    id: 2,
    name: "Certificación a nivel nacional",
    icon: <IconCertificate color="#ffff" />,
  },
  {
    id: 3,
    name: "Calidad en enseñanza",
    icon: <IconStars color="#ffff" />,
  },
  {
    id: 4,
    name: "Laboratorios y forúms internacionales",
    icon: <IconUserScreen color="#ffff" />,
  },
];

export const WhyDetailSection = () => {
  return (
    <>
      <section className="bg-green-900 px-4 pt-4">
        <main className="lg:container sm:pt-20 grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center items-start gap-4 order-1 lg:order-1">
            <div className="text-balance text-slate-200 text-[32px] font-medium">
              ¿Por qué elegir el CIUNAP?
            </div>
            <div className="text-balance text-slate-200 text-base font-medium">
              No dejes pasar esta oportunidad y Aprende Chino Mandarín de forma
              Virtual 100% en Vivo desde la comodidad de tu hogar u oficina.
              Miles de empresas a nivel nacional e internacional están buscando
              personas Expertas en el Idioma.
            </div>
            <div className="flex-col justify-start items-center gap-4 inline-flex pb-6">
              {dataServices.map((service, i) => (
                <div
                  key={service.id}
                  className="self-stretch justify-start items-center gap-4 inline-flex"
                >
                  <div>{service.icon}</div>
                  <div className="text-slate-200 text-base font-medium">
                    {service.name}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Button
                className="text-slate-950 text-sm font-medium leading-normal"
                variant="solid"
                color="warning"
              >
                Contáctanos
              </Button>
            </div>
          </div>
          <div className="order-2 lg:order-1">
            <Image
              src={imgLangDetail.src}
              alt="Estudiante"
              className="w-full object-cover"
            />
          </div>
        </main>
      </section>
    </>
  );
};
