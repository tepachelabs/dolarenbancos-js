import { button as _button } from '~/components/atoms/button.cva'

import { css } from '../../../styled-system/css'

export const button = css({
  ..._button.raw({ type: 'icon' }),
  bottom: '1em',
  position: 'fixed',
  right: '1em',

  '& p': {
    display: 'none',
  },

  md: {
    bottom: '12.75em',
    paddingRight: '0.85em',
    display: 'flex',
    alignItems: 'center',

    '& p': {
      display: 'initial',
    },
  },
})
