'use client'

import { FC } from 'react'

import { Card } from '~/components/atoms/card.component'
import { widget } from '~/components/micro-dashboard/components/common.styles'
import { useApplication } from '~/lib/application.context-provider'

import { css } from '../../../../../styled-system/css'

const priceDisplay = css({
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'right',
  display: 'block',
})

export const TodayPrice: FC = () => {
  const { referencePrice } = useApplication()

  return (
    <Card backgroundColor="white" width="100%">
      <div className={ widget }>
        <h3>Precio de<br/>referencia</h3>
        <b className={ priceDisplay }>$ {referencePrice}</b>
      </div>
    </Card>
  )
}
