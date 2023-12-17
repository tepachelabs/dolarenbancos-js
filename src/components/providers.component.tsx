'use client'

import { FC, PropsWithChildren } from 'react'

import { CalculatorProvider } from '~/lib/calculator.context-provider'

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <CalculatorProvider>
      {children}
    </CalculatorProvider>
  )
}
