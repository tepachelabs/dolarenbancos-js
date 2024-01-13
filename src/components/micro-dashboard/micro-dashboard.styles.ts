import { css } from '../../../styled-system/css'

export const wrapper = css({
  '--gap': '1rem',
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--gap)',
  width: '100%',
  md: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    '& > *': {
      width: 'calc(50% - calc(var(--gap) / 2))!',
    },
  },
  lg: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    '& > *': {
      width: 'inherit',
    },
  },
})
