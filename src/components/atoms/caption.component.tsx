import { FC, PropsWithChildren } from 'react'

import { css } from '../../../styled-system/css'

const caption = css({
  paddingTop: '1.5em',
})

interface CaptionProps {
  noPadding?: boolean
}

export const Caption: FC<PropsWithChildren<CaptionProps>> = ({ children }) => {
  return (
    <p className={ caption }>
      { children }
    </p>
  )
}
