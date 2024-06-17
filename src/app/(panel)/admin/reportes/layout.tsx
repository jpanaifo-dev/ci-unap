"use client";

import { HeaderSection, PrintExpedientReport } from "@/modules/admin";
import { Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { title: "Expedientes", path: "/admin/reportes" },
  { title: "Matrículas", path: "/admin/reportes/matriculas" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathnane = usePathname();

  return (
    <>
      <HeaderSection
        title="Reportes"
        subtitle="Administrar reportes"
        rigthContent={<PrintExpedientReport />}
      />
      <div className="py-4">
        <Tabs aria-label="tabs" variant="underlined" selectedKey={pathnane}>
          {
            links.map((link) => (
              <Tab
                as={Link}
                key={link.path}
                href={link.path}
                title={link.title}
              />
            ))
          }
        </Tabs>
        {children}
      </div>
    </>
  );
}
