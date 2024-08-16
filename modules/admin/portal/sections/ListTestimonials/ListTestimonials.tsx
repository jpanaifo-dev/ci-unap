/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { ITestimonyList } from '@/types'
import { CardTestimonio, useTestimonials } from '@/modules/admin'
import { Input, Pagination, Skeleton } from '@nextui-org/react'

export const ListTestimonials = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [date, setDate] = useState('')
  const { getTestimonialsList, listTestimonials, loading } = useTestimonials()

  useEffect(() => {
    getTestimonialsList({
      page,
      contenido__icontains: query,
      fecha: date,
    })
  }, [query, page, date])

  const testimonials: ITestimonyList[] = listTestimonials?.results || []

  return (
    <>
      <header className="flex gap-2 justify-between">
        <div>
          <Input
            placeholder="Buscar por nombre"
            value={query}
            onValueChange={setQuery}
            isClearable
            variant="bordered"
            radius="sm"
            onClear={() => setQuery('')}
          />
        </div>
        <div>
          <Input
            placeholder="Buscar por nombre"
            isClearable
            variant="bordered"
            radius="sm"
            value={date}
            onValueChange={setDate}
            type="date"
            onClear={() => setDate('')}
          />
        </div>
      </header>
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              className="w-full h-20"
              key={item}
            />
          ))}
        </div>
      )}
      <section className="flex flex-col gap-4 h-full overflow-y-auto max-h-[calc(100vh-236px)]">
        {testimonials?.length > 0 &&
          !loading &&
          testimonials.map((item) => {
            return (
              <CardTestimonio
                key={item.id}
                item={item}
              />
            )
          })}
      </section>
      <footer className="flex justify-between items-center">
        <div>
          <h3 className="text-sm text-gray-500">
            Total de comentarios: {listTestimonials?.count || 0}
          </h3>
        </div>
        {listTestimonials?.count && listTestimonials?.next !== null && (
          <div>
            <Pagination
              size="sm"
              variant="light"
              total={Math.ceil(listTestimonials?.count / 10) || 0}
              onChange={setPage}
              showControls
            />
          </div>
        )}
      </footer>
    </>
  )
}
