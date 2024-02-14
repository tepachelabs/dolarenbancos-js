import { css } from '../../../styled-system/css'

export const benefitsList = css({
  listStyle: 'inside',
})

export const image = css({
  borderRadius: '100%',
})

export const elementsWrapper = css({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '16px',
})

export const copyWrapper = css({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignContent: 'center',
  textAlign: 'center',
  '& h3': {
    fontSize: '2rem',
  },
  '& p': {
    fontSize: '1.5rem',

    '& strong': {
      textDecoration: 'underline',
    },
  },
  'lg': {
    textAlign: 'left',

    '& p': {
      fontSize: '1rem',
    },
  },
})

export const button = css({
  margin: 'auto',
  backgroundColor: 'black',
  color: 'white',
  padding: '16px 24px',
  textDecoration: 'none',
  fontSize: '1.5rem',
  'lg': {
    fontSize: '1rem',
    margin: '0 0 0 auto',
  },
})
