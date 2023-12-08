import { css } from '../../../styled-system/css'

const gap = '1rem'

export const table = css({
  textAlign: 'center',
  width: '100%',

  '& th': {
    fontWeight: 'bold',
    padding: gap,
  },

  '& tr': {
    borderBottom: '1px solid',
    borderColor: 'lightGrey',
  },

  '& td': {
    padding: gap,
  },
})
