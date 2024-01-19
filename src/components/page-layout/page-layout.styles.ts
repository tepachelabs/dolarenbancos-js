import { button } from '~/components/atoms/button.cva'

import { css, cva } from '../../../styled-system/css'

export const header = css({
  backgroundColor: 'primaryLighter',
  borderBottom: '1px solid',
  borderColor: 'lightGrey',
  position: 'sticky',
  top: 0,
  zIndex: 1,
})

const navDesktop = ({
  lg: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    display: 'flex',
    maxHeight: 'initial',
    overflow: 'initial',
  },
})

export const nav = css({
  backgroundColor: 'primaryLight',

  ...navDesktop,
})

export const animatedNav = cva({
  base: {
    overflow: 'hidden',
    transition: 'all',
    transitionTimingFunction: 'ease-in-out',
    transitionDuration: '0.25s',

    ...navDesktop,
  },
  variants: {
    show: {
      preEnter: {
        maxHeight: '0',
      },
      entering: {
        maxHeight: '0',
      },
      entered: {
        maxHeight: '100vh',
      },
      preExit: {
      },
      exiting: {
        maxHeight: '0',
      },
      exited: {
        maxHeight: '0',
      },
      unmounted: {},
    },
  },
})

export const navTrigger = cva({
  base: {
    ...button.raw({ type: 'icon' }),
    display: 'block',

    '& rect': {
      transition: 'all',
      transitionTimingFunction: 'ease-in-out',
      transitionDuration: '0.25s',
    },

    lg: {
      display: 'none',
    },
  },
  variants: {
    isEnter: {
      true: {
        '& rect:first-of-type': {
          transform: 'rotate(45deg) translate(15px, -32px)',
        },
        '& rect:last-of-type': {
          transform: 'rotate(-45deg) translate(-37px, 8px)',
        },
      },
    },
  },
})

export const row = css({
  lg: {
    margin: '0 auto',
    maxWidth: 'pageWidth',
    padding: '0.75rem 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
})

export const wrapper = css({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  margin: '0 auto',
  maxWidth: 'condensedPageWidth',
  padding: '1.5rem 1rem',
  width: '100%',
  justifyContent: 'space-between',

  lg: {
    padding: '0',
  },
})

export const logo = css({
  textDecoration: 'none',
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
  '& a': {
    textDecoration: 'none',
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

export const footerNav = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '1em',
  justifyContent: 'center',
  padding: '1em 0',
  md: {
    justifyContent: 'flex-end',
  },
})
