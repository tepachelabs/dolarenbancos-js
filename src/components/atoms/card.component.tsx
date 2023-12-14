import { FC, PropsWithChildren } from 'react'

import { css, cx } from '../../../styled-system/css'

const card = css({
  border: '1px solid',
  borderColor: 'black',
  padding: '1rem',

  '& h3': {
    marginBottom: '1rem',
  },
})

interface CardProps {
  backgroundColor?: 'transparent' | 'white'
  padding?: string
  marginBottom?: string
}

export const Card: FC<PropsWithChildren<CardProps>> = ({
  backgroundColor = 'transparent',
  children,
  marginBottom,
  padding,
}) => {
  return (
    <div className={ cx(card, css({ backgroundColor, marginBottom, padding })) }>
      { children }
    </div>
  )
}
