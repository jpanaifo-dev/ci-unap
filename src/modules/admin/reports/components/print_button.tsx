import { Button } from "@nextui-org/button";
import { IconReport } from "@tabler/icons-react";

export const PrintExpedientReport = () => {
  return (
    <>
      <Button
        aria-label="button"
        radius="sm"
        size="sm"
        startContent={<IconReport size={16} className="text-white" />}
        className="button-dark"
      >
        IMPRIMIR
      </Button>
    </>
  );
};
