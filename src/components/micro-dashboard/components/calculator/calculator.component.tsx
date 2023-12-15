import { FC } from 'react'

import { Card } from '~/components/atoms/card.component'
import { widget } from '~/components/micro-dashboard/components/common.styles'

import { css } from '../../../../../styled-system/css'

interface Props {
  price: string
}

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

export const Calculator: FC<Props> = ({ price }) => {
  return (
    <Card backgroundColor='white' width='100%'>
      <div className={ widget }>
        <h3>Calculadora</h3>
        <div>
          <div className={ input }>
            <label htmlFor="mxn">MXN</label>
            <input type="number" name="mxn" value={price}/>
          </div>
          <div className={ input }>
            <label htmlFor="usd">USD</label>
            <input type="number" name="usd" value={1}/>
          </div>
        </div>
      </div>
    </Card>
  )
}
