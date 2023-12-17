'use client'

import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'
import { useBoolean } from 'usehooks-ts'

// Context type
interface CalculatorResultContextType {
  usd: number;
  mxn: number;
  isDirty: boolean;
  setUsd: (price: number) => void;
  setMxn: (price: number) => void;
  reset: () => void;
}

export const CalculatorResultContext = createContext<CalculatorResultContextType | undefined>(undefined)

interface CalculatorResultProps {
  referencePrice: number
}

// Context provider (all the logic goes here)
export const CalculatorResultProvider: FC<PropsWithChildren<CalculatorResultProps>> = ({
  children,
  referencePrice,
}) => {
  const { setFalse, setTrue: setIsDirty, value: isDirty } = useBoolean(false)
  const [usd, setUsd] = useState<number>(1)
  const [mxn, setMxn] = useState<number>(referencePrice)

  const setWithDirtyStatus = useMemo(() => (fn: any) => (args: any) => {
    setIsDirty()
    fn(args)
  }, [setIsDirty])

  const reset = useCallback(() => {
    setFalse()
    setUsd(1)
    setMxn(referencePrice)
  },[referencePrice, setFalse])

  const value = useMemo(() => ({
    usd,
    mxn,
    isDirty,
    setUsd: setWithDirtyStatus(setUsd),
    setMxn: setWithDirtyStatus(setMxn),
    reset,
  }), [isDirty, mxn, reset, setWithDirtyStatus, usd])

  return (
    <CalculatorResultContext.Provider value={ value }>
      { children }
    </CalculatorResultContext.Provider>
  )
}

// Hook to use the context
export const useCalculatorResult = () => {
  const context = useContext(CalculatorResultContext)

  if (context === undefined) {
    throw new Error('useCalculatorResult must be used within a CalculatorResultProvider')
  }

  return context
}
