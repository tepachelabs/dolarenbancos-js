'use client'

import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react'

// Context type
interface ApplicationContextType {
  referencePrice: number;
  setReferencePrice: (price: number) => void;
}

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

// Context provider (all the logic goes here)
export const ApplicationProvider: FC<PropsWithChildren<{ price: number }>> = ({ children, price }) => {
  const [referencePrice, setReferencePrice] = useState<number>(price || 0)

  const value = useMemo(() => ({
    referencePrice,
    setReferencePrice,
  }), [referencePrice])

  return (
    <ApplicationContext.Provider value={ value }>
      { children }
    </ApplicationContext.Provider>
  )
}

// Hook to use the context
export const useApplication = () => {
  const context = useContext(ApplicationContext)

  if (context === undefined) {
    throw new Error('useApplication must be used within a ApplicationProvider')
  }

  return context
}
