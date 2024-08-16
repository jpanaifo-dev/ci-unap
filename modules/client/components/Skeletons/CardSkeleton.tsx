import { Card, CardBody, CardFooter, Skeleton } from "@nextui-org/react";

export const CardProgramSkeleton = () => (
  <Card shadow="none">
    <Skeleton className="rounded-md">
      <div className="h-56 rounded-md bg-default-300"></div>
    </Skeleton>
    <CardBody className="px-0">
      <div className="flex flex-col w-full gap-3 pt-3">
        <Skeleton className="w-3/4">
          <div className="h-6 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
        <Skeleton className="w-3/4">
          <div className="h-6 w-full rounded-lg bg-default-200"></div>
        </Skeleton>
      </div>
    </CardBody>
    <CardFooter className="px-0">
    <Skeleton className="w-20 rounded-md">
          <div className="h-8 w-20 rounded-lg bg-default-200"></div>
        </Skeleton>
    </CardFooter>
  </Card>
);
