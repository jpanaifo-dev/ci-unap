'use client'
import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export const CountDisplay = ({ value }: { value: number }) => {
  const count = useMotionValue(0)
  const rounded = useTransform(count, Math.round)

  useEffect(() => {
    const controls = animate(count, value, {
      // type: 'tween',
      duration: 2,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return (
    <>
      <motion.h1 className="text-7xl font-bold text-gray-300 pr-6 pt-8">
        {rounded}
      </motion.h1>
    </>
  )
}
