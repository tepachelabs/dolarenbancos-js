import { button } from '~/components/atoms/button.cva'

import { css } from '../../../styled-system/css'

export const header = css({
  backgroundColor: 'primaryLighter',
  borderBottom: '1px solid',
  borderColor: 'lightGrey',
  position: 'sticky',
  top: 0,
  zIndex: 1,
})

export const nav = {
  active: css({
    backgroundColor: 'primaryLight',
    position: 'fixed',
    top: 'calc(7.5rem + 1px)',
    left: 0,
    width: '100%',
    lg: {
      backgroundColor: 'transparent',
      display: 'block',
      position: 'static',
      width: 'initial',
    },
  }),
  inactive: css({
    display: 'none',
    lg: {
      display: 'block',
    },
  }),
}

export const navTrigger = css({
  ...button.raw(),
  display: 'block',
  lg: {
    display: 'none',
  },
})

export const wrapper = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 auto',
  maxWidth: 'condensedPageWidth',
  padding: '1.5rem 1rem',

  lg: {
    maxWidth: 'pageWidth',
    padding: '0.75rem 0',
  },
})

export const logo = css({
  '& em': {
    color: 'primary',
  },
})

export const mainNav = css({
  display: 'flex',
  borderBottom: '1px solid',
  borderColor: 'black',
  flexDirection: 'column',
  fontFamily: 'mono',
  fontSize: '2em',
  gap: '0.5em',
  textTransform: 'uppercase',
  textAlign: 'center',
  '& li': {
    padding: '0.5em 0',
  },

  lg: {
    borderBottom: '0',
    flexDirection: 'row',
    fontSize: '1.25em',
    gap: '1.75em',

    '& li': {
      padding: '0',
    },
  },
})

export const footer = css({
  backgroundColor: 'black',
  color: 'white',
  padding: '4rem 0',

  '& h1': {
    fontSize: '2em',
  },

  '& > div': {
    flexDirection: 'column',
    md: {
      flexDirection: 'row',
    },
  },
})
