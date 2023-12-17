'use client'

import { FC } from 'react'

import { useApplication } from '~/lib/application.context-provider'
import { useCalculator } from '~/lib/calculator.context-provider'

import { css } from '../../../styled-system/css'

const button = css({
  backgroundColor: 'black',
  border: '1px solid',
  borderColor: 'black',
  color: 'white',
  cursor: 'pointer',
  fontSize: '1.25em',
  fontWeight: 'bold',
  padding: '0.5em 1em',
})

export const ResetButton: FC = () => {
  const { isDirty, setDefaults } = useCalculator()
  const { referencePrice } = useApplication()

  function onClick () {
    setDefaults(1, referencePrice)
  }

  return isDirty && (
    <button className={ button } onClick={ onClick }>
      Reiniciar
    </button>
  )
}
