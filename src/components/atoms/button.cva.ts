import { cva } from '../../../styled-system/css'

export const button = cva({
  base: {
    backgroundColor: 'black',
    border: '1px solid',
    borderColor: 'black',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.6em',
    fontWeight: '500',
    padding: '0.5em 1em',
    textDecoration: 'none',
    md: {
      fontSize: '1.25em',
    },
  },
  variants: {
    type: {
      icon: {
        fontSize: '1.25em',
        padding: '0',
      },
    },
  },
})
