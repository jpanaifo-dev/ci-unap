'use client'
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from 'react'

import {
  Table,
  TableBody,
  TableHeader,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
  Button,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
  Chip,
  CircularProgress,
  Pagination,
} from '@nextui-org/react'
import { IColumns, IRows, IActions, IPagination } from '../../types'
import { IconSearch, IconDots } from '@tabler/icons-react'
import Link from 'next/link'
// import { LoadingPages } from '../..'
import { usePathname } from 'next/navigation'

interface IProps {
  columns: Array<IColumns>
  actionsList?: Array<IActions>
  rows: Array<IRows>
  loading?: boolean
  selectionMode?: 'single' | 'multiple' | 'none'
  onSelectionChange?: (row: IRows) => void
  //For the search input
  disableInputSearch?: boolean
  onSearch?: (value: string) => void
  searchValue?: string
  pagination?: IPagination
  placeholder?: string
  //Section render content
  topContent?: React.ReactNode
}

export const TableCustom = (props: IProps) => {
  const {
    columns,
    rows,
    onSelectionChange,
    selectionMode,
    disableInputSearch,
    onSearch,
    searchValue,
    actionsList,
    loading,
    pagination,
    topContent,
  } = props

  const pathname = usePathname()

  const renderCell = useCallback((item: IRows, columnKey: React.Key) => {
    const value = getKeyValue(item, columnKey as string)
    switch (columnKey) {
      case 'actions':
        return (
          <>
            {actionsList ? (
              <>
                <Dropdown
                  aria-label="dropdown"
                  size="sm"
                  radius="sm"
                  showArrow
                  classNames={{
                    content:
                      'bg-white border border-gray-200 shadow-lg w-[200px]',
                    base: 'text-tiny w-[200px] ',
                  }}
                >
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      variant="light"
                      isIconOnly
                    >
                      <IconDots
                        stroke={1.5}
                        className="text-gray-500"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="DropdownMenu">
                    {actionsList.map((action, index) => (
                      <DropdownItem
                        aria-label={`dropdown-item-${action.label}`}
                        key={index}
                        as={Link}
                        href={
                          action?.label === 'Editar'
                            ? `${pathname}/${item.key}/editar`
                            : `${pathname}/${item.key}/${action.href}`
                        }
                      >
                        {action.label}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </Dropdown>
              </>
            ) : (
              <>
                <Dropdown
                  aria-label="dropdown"
                  size="sm"
                  radius="sm"
                  showArrow
                  classNames={{
                    content:
                      'bg-white border border-gray-200 shadow-lg w-[200px]',
                    base: 'text-tiny w-[200px] ',
                  }}
                >
                  <DropdownTrigger>
                    <Button
                      size="sm"
                      variant="light"
                      isIconOnly
                    >
                      <IconDots
                        stroke={1.5}
                        className="text-gray-500"
                      />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="DropdownMenu">
                    <DropdownItem
                      aria-label="dropdown-item-editar"
                      as={Link}
                      href={`${pathname}/${item.key}/editar`}
                    >
                      Editar
                    </DropdownItem>
                    <DropdownItem
                      aria-label="dropdown-item-detalle"
                      as={Link}
                      href={`${pathname}/${item.key}`}
                    >
                      Detalles
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </>
            )}
          </>
        )
      case 'status':
        return (
          <>
            <Chip
              aria-label="chip"
              radius="sm"
              size="sm"
              variant="bordered"
            >
              {value ? 'Activo' : 'Inactivo'}
            </Chip>
          </>
        )
      default:
        return value
    }
  }, [])

  const onRowAction = (key: string | number | bigint) => {
    const item = rows.filter((row) => Number(row.key) === Number(key))
    onSelectionChange && onSelectionChange(item[0])
  }

  const showPagination = pagination?.count && pagination?.count > 15

  return (
    <>
      <header className="flex gap-3 items-start">
        {disableInputSearch ? null : (
          <section className="pb-4 w-full max-w-[300px]">
            <Input
              aria-label="Buscar"
              variant="bordered"
              placeholder={props.placeholder || 'Type to search...'}
              radius="sm"
              classNames={{
                input: ['max-w-[300px]'],
                inputWrapper: ['w-full max-w-[300px]'],
              }}
              value={searchValue}
              onValueChange={(value) => onSearch && onSearch(value)}
              startContent={<IconSearch size={16} />}
            />
          </section>
        )}
        {topContent && <>{topContent}</>}
      </header>
      <Table
        aria-label="TableGeneral"
        aria-labelledby="TableGeneral"
        removeWrapper
        isHeaderSticky
        classNames={{
          th: [
            'font-semibold',
            'bg-[#F6F6F7]',
            'text-black shadow-none border-[#64748B]',
          ],
          base: 'max-h-[calc(100vh-22rem)] overflow-y-auto bg-white',
          td: ['text-xs', 'text-black', 'font-medium'],
        }}
        selectionMode={selectionMode}
        onRowAction={onRowAction}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.align}
              //   allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={'No hay datos disponibles'}
          items={rows}
          loadingContent={
            <CircularProgress
              label="Cargando ..."
              color="default"
            />
          }
          isLoading={loading}
        >
          {(item) => (
            <TableRow key={item?.key}>
              {(columnKey) => (
                <TableCell width={columnKey === 'actions' ? '100px' : 'auto'}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* Bottom section */}
      <section className="flex justify-between items-center pt-6">
        <section>
          <h3 className="text-xs text-gray-500">
            Total de items {rows.length} de {pagination?.count}
          </h3>
        </section>
        <section className="flex gap-3 items-center">
          <div>
            {showPagination && (
              <Pagination
                total={Math.ceil(
                  pagination.count /
                    (pagination?.rowsPerPage ? pagination.rowsPerPage : 15)
                )}
                page={pagination?.page}
                onChange={(newPage: number) => {
                  pagination.onChangePage && pagination.onChangePage(newPage)
                }}
                variant="light"
                size="sm"
                showControls
                classNames={{
                  item: 'font-semibold',
                  cursor: 'bg-gray-800',
                }}
              />
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold">
              {pagination ? (
                <>
                  Página {pagination.page} de {Math.ceil(pagination.count / 15)}
                </>
              ) : (
                <>Página 1 de 1</>
              )}
            </h3>
          </div>
        </section>
      </section>
      {/* <LoadingPages isOpen={props.loading ?? false} /> */}
    </>
  )
}
