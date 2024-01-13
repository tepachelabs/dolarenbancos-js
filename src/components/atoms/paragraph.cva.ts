import { cva } from '../../../styled-system/css'

export const truncate = cva({
  base: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
})

