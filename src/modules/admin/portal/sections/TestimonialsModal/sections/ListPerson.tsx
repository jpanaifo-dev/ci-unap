/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
import {
  TableCustom,
  IColumns,
  IRows,
  usePersons,
} from "@/modules/admin";
import { IPerson } from "@/types";

const columns: IColumns[] = [
  {
    key: "id",
    label: "ID",
    align: "center",
  },
  {
    key: "nombres",
    label: "Nombres",
    align: "center",
  },
];

interface IProps {
  onSelectProgram: (person: IRows) => void;
}

export const ListPersonas = (props: IProps) => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const { onSelectProgram } = props;
  const { getPersons, listPersons } = usePersons();

  useEffect(() => {
    getPersons({ page, nombres__icontains: query });
  }, [query]);

  const dataList: IPerson[] = listPersons?.results ?? [];

  const rows: IRows[] = dataList?.map((item) => {
    return {
      key: item.id,
      id: item.id,
      nombres: item.nombres + " " + item.apellido_paterno + " " + item.apellido_materno,
    };
  });

  return (
    <>
      <TableCustom
        placeholder="Buscar persona"
        columns={columns}
        rows={rows}
        onSearch={(value) => setQuery(value)}
        searchValue={query}
        selectionMode="single"
        onSelectionChange={(selected) => {
          onSelectProgram(selected);
        }}
        pagination={{
          onChangePage: (page) => {
            setPage(page);
          },
          page: page,
          count: listPersons?.count ?? 0,
        }}
      />
    </>
  );
};
