import { CardProgramSkeleton } from '@/modules/client/components'

export const LoadingCardProgram = () => (
  <>
    {[...Array(4)].map((_, i) => (
      <CardProgramSkeleton key={i} />
    ))}
  </>
)
