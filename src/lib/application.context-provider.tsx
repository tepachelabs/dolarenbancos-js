'use client'

import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react'

// Context type
interface ApplicationContextType {
  referencePrice: number;
  setReferencePrice: (price: number) => void;
}

export const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

interface ApplicationContextProps {
  referencePrice: number;
}

// Context provider (all the logic goes here)
export const ApplicationProvider: FC<PropsWithChildren<ApplicationContextProps>> = ({
  children,
  referencePrice: _referencePrice,
}) => {
  const [referencePrice, setReferencePrice] = useState<number>(_referencePrice || 0)

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
