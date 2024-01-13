import { truncate } from '~/components/atoms/paragraph.cva'

import { css, cva } from '../../../styled-system/css'

const gap = '1.5rem'

const commonBorder = {
  border: '1px solid',
  borderColor: 'black',
}

export const subtitle = css({
  fontSize: '1.2em',
  marginBottom: '1em',

  '& em': {
    color: 'primary',
    // fontSize: '1.5em',
    fontWeight: 'bold',
  },
})

export const table = css({
  ...commonBorder,

  backgroundColor: 'white',
  fontFamily: 'body',
  fontSize: '1.5em',
  tableLayout: 'fixed',
  textAlign: 'center',
  width: '100%',

  '& th': {
    fontWeight: 'bold',
    padding: gap,
    borderRight: '1px solid',
    borderColor: 'black',
  },

  '& tr': {
    ...commonBorder,
  },

  '& td': {
    ...commonBorder,
    padding: gap,
  },
})

export const cell = cva({
  base: {
    ...truncate.raw(),
  },
  variants: {
    color: {
      green: {
        backgroundColor: 'green',
      },
      red: {
        backgroundColor: 'red',
      },
    },
  },
})
