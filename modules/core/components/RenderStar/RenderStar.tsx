'use client'
import { IconStar, IconStarFilled } from '@tabler/icons-react'

interface IProps {
  value: number
}

export const RenderStar = (props: IProps) => {
  const { value } = props

  const renderStars = (value: number) => {
    const totalStars = 5
    const filledStars = Math.floor(value)
    const outlinedStars = totalStars - filledStars

    return (
      <>
        {[...Array(filledStars)].map((_, index) => (
          <IconStarFilled
            key={index}
            size={14}
            className="text-warning-500"
          />
        ))}
        {[...Array(outlinedStars)].map((_, index) => (
          <IconStar
            key={index}
            size={14}
            className="text-gray-400"
          />
        ))}
      </>
    )
  }
  return <div className="flex items-center gap-1">{renderStars(value)}</div>
}
