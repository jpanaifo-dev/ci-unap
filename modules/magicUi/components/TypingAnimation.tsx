/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { cn } from '@nextui-org/react'
import { useEffect, useState } from 'react'

interface TypingAnimationProps {
  text: string
  duration?: number
  className?: string
}

export default function TypingAnimation({
  text,
  duration = 200,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState<string>('')
  const [i, setI] = useState<number>(0)
  const [reset, setReset] = useState<boolean>(false)

  useEffect(() => {
    const typingEffect = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prevState) => prevState + text.charAt(i))
        setI(i + 1)
      } else {
        clearInterval(typingEffect)
        setTimeout(() => {
          setDisplayedText('')
          setI(0)
          setReset((prev) => !prev) // Trigger reset
        }, duration) // Wait for the duration before resetting
      }
    }, duration)

    return () => {
      clearInterval(typingEffect)
    }
  }, [i, reset]) // Include reset in dependency array to restart effect

  return (
    <h1
      className={cn(
        'font-display text-center  leading-[5rem] tracking-[-0.02em] drop-shadow-sm',
        className
      )}
    >
      {displayedText + (i < text.length ? '|' : '')}
    </h1>
  )
}
