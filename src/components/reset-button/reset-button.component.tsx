'use client'

import { FC } from 'react'

import { button } from '~/components/atoms/button.cva'
import { useCalculatorResult } from '~/lib/calculator-result.context-provider'

export const ResetButton: FC = () => {
  const { isDirty, reset } = useCalculatorResult()

  function onClick () {
    reset()
  }

  return isDirty && (
    <button className={ button() } onClick={ onClick }>
      Reiniciar
    </button>
  )
}
