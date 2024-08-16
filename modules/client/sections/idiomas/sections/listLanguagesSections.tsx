'use client'
import { Input } from '@nextui-org/react'
import { IconSearch } from '@tabler/icons-react'

import { CardProgram } from '../../../components'
import { useEffect } from 'react'

export const LanguagesSectionList = () => {
  return (
    <>
      <header>
        <div className="w-full max-w-md">
          <Input
            placeholder="Buscar idioma"
            radius="sm"
            variant="flat"
            startContent={<IconSearch size={20} />}
          />
        </div>
      </header>
      {/* <main className="w-full">
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3">
          {dataLanguages.length === 0 ? (
            <></>
          ) : (
            dataLanguages.map((item, index) => (
              <CardProgram
                key={index}
                name={item.nombre}
                description={item.codigo}
                image={
                  item.imagen ||
                  'https://img.freepik.com/vector-gratis/fondo-libro-ingles-dibujado-mano_23-2149483336.jpg?w=1380&t=st=1714156896~exp=1714157496~hmac=20d9120bfc74ed31141aa034d58bf6ec64cfda2eab4e6064323387fef93aa1e5'
                }
                href={`idiomas/${item.nombre}`}
              />
            ))
          )}
        </div>
      </main> */}
    </>
  )
}
