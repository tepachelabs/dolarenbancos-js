'use client'

import { ChangeEvent, FC } from 'react'

import { Card } from '~/components/atoms/card.component'
import { widget } from '~/components/micro-dashboard/components/common.styles'
import { useApplication } from '~/lib/application.context-provider'
import { useCalculatorResult } from '~/lib/calculator-result.context-provider'

import { css } from '../../../../../styled-system/css'

const input = css({
  fontFamily: 'mono',
  fontSize: '1.25em',
  position: 'relative',

  '& input': {
    border: '1px solid',
    borderColor: 'black',
    marginTop: '1.5em',
    padding: '0.3em 0.5em 0.2em 4em',
    width: '100%',
  },

  '& label': {
    position: 'absolute',
    top: '1.85em',
    left: '1em',
  },
})

export const Calculator: FC = () => {
  const { referencePrice } = useApplication()
  const { mxn, setMxn, setUsd, usd } = useCalculatorResult()

  function onMxnUpdate (event: ChangeEvent<HTMLInputElement>) {
    const mxn = event.target.value
    const usd = Number(mxn) / referencePrice
    setMxn(Number(mxn))
    setUsd(usd)
  }

  function onUsdUpdate (event: ChangeEvent<HTMLInputElement>) {
    const usd = event.target.value
    const mxn = Number(usd) * referencePrice
    setUsd(Number(usd))
    setMxn(mxn)
  }

  return (
    <Card backgroundColor="white" width="100%">
      <div className={ widget }>
        <h3>Calculadora</h3>
        <div>
          <div className={ input }>
            <label htmlFor="mxn">MXN</label>
            <input type="number" name="mxn" value={ (mxn || referencePrice).toFixed(2) } onChange={ onMxnUpdate }/>
          </div>
          <div className={ input }>
            <label htmlFor="usd">USD</label>
            <input type="number" name="usd" value={ usd.toFixed(2) } onChange={ onUsdUpdate }/>
          </div>
        </div>
      </div>
    </Card>
  )
}
