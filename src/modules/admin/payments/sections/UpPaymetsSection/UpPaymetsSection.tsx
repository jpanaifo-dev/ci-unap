'use client'
import { Button } from '@nextui-org/button'
import Link from 'next/link'

export const UpPaymetsSection = () => {
  return (
    <>
      <Button
        size="sm"
        variant="faded"
        as={Link}
        href="/admin/pagos/importar-pagos"
      >
        Importar pagos
      </Button>
    </>
  )
}
