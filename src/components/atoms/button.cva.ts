import { cva } from '../../../styled-system/css'

export const button = cva({
  base: {
    backgroundColor: 'black',
    border: '1px solid',
    borderColor: 'black',
    color: 'white',
    cursor: 'pointer',
    fontSize: '1.25em',
    fontWeight: '500',
    padding: '0.5em 1em',
  },
})

