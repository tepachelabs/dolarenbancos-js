import { css } from '../../../styled-system/css'

const gap = '1.5rem'

const commonBorder = {
  border: '1px solid',
  borderColor: 'black',
}

export const table = css({
  ...commonBorder,

  backgroundColor: 'white',
  fontFamily: 'body',
  fontSize: '1.5em',
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
