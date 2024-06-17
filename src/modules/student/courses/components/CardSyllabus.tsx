"use client";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";
import { IconDownload, IconNotes } from "@tabler/icons-react";

interface ISilabo {
  title: string;
  description: string;
  downloadLink?: string;
  children?: React.ReactNode;
}

export const CardSyllabus = ({
  title,
  description,
  downloadLink,
  children,
}: ISilabo) => {
  return (
    <>
      <Card shadow="sm" className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <IconNotes size={100} stroke={1} />
          <div className="flex flex-col gap-2">
            <p className="text-md">{title.toUpperCase()}</p>
            <p className="text-small text-default-500">
              Resolución: {description}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          {children || (
            <p>Click en el boton inferior para descargar documento.</p>
          )}
        </CardBody>
        <Divider />
        {downloadLink && (
          <CardFooter className="flex justify-end">
            <Button
              as={Link}
              endContent={<IconDownload size={20} />}
              isExternal
              color="success"
              href={downloadLink}
              className="text-white"
            >
              Descargar
            </Button>
          </CardFooter>
        )}
      </Card>
    </>
  );
};
