import { FC } from 'react'

import { Card } from '~/components/atoms/card.component'
import { widget } from '~/components/micro-dashboard/components/common.styles'

import { css } from '../../../../../styled-system/css'

interface Props {
  price: string
}

const priceDisplay = css({
  fontSize: '4rem',
  fontWeight: 'bold',
  textAlign: 'right',
  display: 'block',
})

export const TodayPrice: FC<Props> = ({ price }) => {
  return (
    <Card backgroundColor="white" width="100%">
      <div className={ widget }>
        <h3>Precio de<br/>referencia</h3>
        <b className={ priceDisplay }>$ 19.89</b>
      </div>
    </Card>
  )
}
