'use client'
import { QueryFilter, FPersonOptions } from '@/modules/admin'

export const TopContent = () => {
  return (
    <>
      <section className="w-full max-w-[520px]">
        <QueryFilter
          optionsFilter={FPersonOptions}
          defaultSelectedKeys="dni"
        />
      </section>
    </>
  )
}
