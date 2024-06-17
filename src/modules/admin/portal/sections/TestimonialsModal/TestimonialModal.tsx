"use client";
import { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { HeaderSection } from "@/modules/admin";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ITestimony } from "@/types";
import { DialogAction } from "@/components";
import { fetchCore } from "@/api";

//To alert
import { toast } from "react-toastify";
import { ActionData } from "./sections/ActionData";
import { converDate } from "@/utils";
import { InfoData } from "./sections/InfoData";
import { TestimonialDetail } from "./sections/TestimonialDetail";
import { PersonData } from "./sections/PersonData";

interface IProps {
  defaulData?: ITestimony;
}

export const TestimonialModal = (props: IProps) => {
  const { defaulData } = props;
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const methods = useForm<ITestimony>({
    defaultValues: defaulData,
  });

  const { reset } = useForm();

  const onSubmit = () => {
    setOpen(true);
  };

  const handleFormSubmit: SubmitHandler<ITestimony> = async (
    data: ITestimony
  ) => {
    setOpen(false);
    setLoading(true);

    const { persona, ...res } = data;

    const newData = {
      ...res,
      persona: persona.id,
    };

    if (defaulData?.id) {
      const res = await fetchCore(
        `portal/Testimonio/${data.id}/`,
        {
          method: "PUT",
          body: JSON.stringify(newData),
        },
        {
          revalidatePath: 0,
          caches: "no-store",
        }
      )
        .then((res) => res)
        .catch((err) => err);
      if (res.status === 200) {
        toast.success("Comentario actualizado correctamente");
        handleExit();
      } else {
        toast.error("Error al actualizar la comentario");
      }
    } else {
      const res = await fetchCore("portal/Testimonio/", {
        method: "POST",
        body: JSON.stringify(newData),
      })
        .then((res) => res)
        .catch((err) => err);
      if (res.status === 201) {
        toast.success("Comentario creado correctamente");
        handleExit();
      } else {
        toast.error("Error al crear la comentario");
      }
    }
    setLoading(false);
    reset();
  };

  const handleExit = () => {
    methods.setValue("is_active", false);
    methods.setValue("is_public", false);
    reset();
    router.refresh();
    router.push("/admin/portal/comentarios");
  };
  return (
    <>
      <Modal isOpen onClose={handleExit} radius="sm" size="2xl">
        <ModalContent>
          <ModalHeader>
            <div className="w-full">
              <HeaderSection
                title={defaulData?.id ? "Editar comentario" : "Nuevo comentario"}
                subtitle={defaulData?.id ? "Edita un comentario" : "Agrega un nuevo comentario al sistema"}
              />
            </div>
          </ModalHeader>
          <ModalBody>
            <FormProvider {...methods}>
              <form
                className="flex flex-col gap-4"
                onSubmit={methods.handleSubmit(onSubmit)}
              >
                <InfoData />

                {defaulData?.id && (
                  <>
                    <TestimonialDetail defaulData={defaulData} />
                  </>
                )}
                {!defaulData?.id && (
                  <>
                    <PersonData />
                  </>
                )}

                <ActionData />
              </form>
            </FormProvider>
          </ModalBody>
          <ModalFooter>
            <footer className="flex items-center gap-3 justify-end">
              <Button
                className="button-dark"
                radius="sm"
                type="submit"
                onPress={() => methods.handleSubmit(handleFormSubmit)()}
                isLoading={loading}
                isDisabled={loading}
              >
                Guardar
              </Button>

              <Button radius="sm" onPress={handleExit}>
                Cancelar
              </Button>
            </footer>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DialogAction
        isOpen={isOpen}
        setOpen={setOpen}
        title="Guardar Modalidad"
        message="¿Estás seguro de guardar esta modalidad?"
        onPress={methods.handleSubmit(handleFormSubmit)}
      />
    </>
  );
};
