/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react";
import { Avatar, Button, Input, Select, SelectItem } from "@nextui-org/react";
import { IconClearAll, IconSearch } from "@tabler/icons-react";
import { usePrograms } from "@/modules/admin";

const situation = [
  { key: "true", label: "Activo" },
  { key: "false", label: "Inactivo" },
  { key: "todos", label: "Todos" },
];

const graduatedOption = [
  { key: "true", label: "Graduado" },
  { key: "false", label: "No graduado" },
  { key: "todos", label: "Todos" },
];

const retiredOption = [
  { key: "true", label: "Retirado" },
  { key: "false", label: "No retirado" },
  { key: "todos", label: "Todos" },
];

export const FilterExpedienteOptions = ({
  query,
  setQuery,
}: {
  query: any;
  setQuery: any;
}) => {
  const { getLanguages, listPrograms } = usePrograms();

  useEffect(() => {
    getLanguages();
  }, []);

  const programs = listPrograms?.results || [];

  const [program, setProgram] = useState("");
  const [active, setActive] = useState("");
  const [graduated, setGraduated] = useState("");
  const [retired, setRetired] = useState("");

  const handleSelection = (e: any) => {
    setProgram(e.target.value);
    setQuery({ ...query, programaId: e.target.value });
  };

  const handleStatusChange = (e: any) => {
    setActive(e.target.value);
    setQuery({ ...query, isActive: e.target.value });
  };

  const handleGraduatedChange = (e: any) => {
    setGraduated(e.target.value);
    setQuery({ ...query, isGraduated: e.target.value });
  };

  const handleRetiredChange = (e: any) => {
    setRetired(e.target.value);
    setQuery({ ...query, isRetired: e.target.value });
  };

  const resetFilters = () => {
    setProgram("");
    setActive("");
    setGraduated("");
    setRetired("");
    setQuery({ programaId: "", isActive: "", isGraduated: "" });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 justify-between">
      <div>
        <Input
          aria-label="Buscar"
          variant="bordered"
          type="text"
          placeholder="Buscar expediente"
          value={query.name}
          startContent={<IconSearch size={16} />}
          onChange={(e) => setQuery({ ...query, name: e.target.value })}
          classNames={{
            input: ["max-w-[300px]"],
            inputWrapper: ["w-full max-w-[300px]"],
          }}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        {/* <Select
          items={retiredOption}
          label="Seleccionar retiro"
          placeholder="Seleccionar retiro"
          labelPlacement="outside-left"
          classNames={{
            base: "max-w-xs",
          }}
          selectedKeys={retired ? [retired] : []}
          onChange={handleRetiredChange}
        >
          {(options) => (
            <SelectItem key={options.key} textValue={options.label}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{options.label}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        <Select
          items={graduatedOption}
          label="Seleccionar graduación"
          placeholder="Seleccionar graduación"
          labelPlacement="outside-left"
          classNames={{
            base: "max-w-xs",
          }}
          selectedKeys={graduated ? [graduated] : []}
          onChange={handleGraduatedChange}
        >
          {(options) => (
            <SelectItem key={options.key} textValue={options.label}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{options.label}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select> */}
        <Select
          items={situation}
          label="Seleccionar situación"
          placeholder="Seleccionar situación"
          labelPlacement="outside-left"
          classNames={{
            base: "max-w-xs",
          }}
          selectedKeys={active ? [active] : []}
          onChange={handleStatusChange}
        >
          {(options) => (
            <SelectItem key={options.key} textValue={options.label}>
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <span className="text-small">{options.label}</span>
                </div>
              </div>
            </SelectItem>
          )}
        </Select>
        <div className="flex">
          <Select
            items={programs}
            label="Seleccionar programa"
            placeholder="Seleccionar programa"
            labelPlacement="outside-left"
            classNames={{
              base: ["w-full max-w-[300px] min-w-[260px]"],
            }}
            selectedKeys={program ? [program] : []}
            onChange={handleSelection}
            renderValue={(items) => {
              return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data?.nombre}
                    className="flex-shrink-0"
                    size="sm"
                    src={item.data?.image ?? ""}
                  />
                  <div className="flex flex-col">
                    <span>{item.data?.nombre}</span>
                    <span className="text-default-500 text-tiny">
                      ({item.data?.codigo})
                    </span>
                  </div>
                </div>
              ));
            }}
          >
            {(language) => (
              <SelectItem key={language.id} textValue={language.nombre}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={language.nombre}
                    className="flex-shrink-0"
                    size="sm"
                    src={language.image ? language.image : undefined}
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{language.nombre}</span>
                    <span className="text-tiny text-default-400">
                      {language.codigo}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
          <Button
            onPress={resetFilters}
            aria-label="button"
            radius="sm"
            size="sm"
            className="button-dark h-13"
          >
            <IconClearAll size={16} className="text-white" />{" "}
          </Button>
        </div>
      </div>
    </div>
  );
};
