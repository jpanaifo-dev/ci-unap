'use client'
import {
  DateRangePicker,
  Input,
  Select,
  SelectItem,
  CalendarDate,
  RangeValue,
} from '@nextui-org/react'
import { IGroup } from '@/types'
import { useFormContext, Controller } from 'react-hook-form'
import { parseDate } from '@internationalized/date'

export const ScoreData = () => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext<IGroup>()

  return <></>
}
