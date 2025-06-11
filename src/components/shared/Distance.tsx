'use client'

import { useLocalSettings } from '@/hooks/useLocalSettings'

// Just takes a number of squares, converts based on user preference
// Call it like this:
//    <D>3</D> -> 3 Squares/6"
export default function D({ children }: { children: React.ReactNode }) {
  const { settings } = useLocalSettings()
  const squares = Number(children)
  const value = settings.distanceUnit === 'inches' ? squares * 2 : squares
  const unit = settings.distanceUnit === 'inches' ? '"' : (squares > 1 ? ' Square': 'Squares')
  
  return <>{value}{unit}</>
}