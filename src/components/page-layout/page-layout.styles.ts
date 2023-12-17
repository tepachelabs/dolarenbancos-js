import { css } from '../../../styled-system/css'

export const header = css({
  backgroundColor: 'primaryLighter',
  borderBottom: '1px solid',
  borderColor: 'lightGrey',
  position: 'sticky',
  top: 0,
  zIndex: 1,
})

export const wrapper = css({
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'space-between',
  margin: '0 auto',
  maxWidth: 'pageWidth',
  padding: '1.5rem 0',
})

export const logo = css({
  '& em': {
    color: 'primary',
  },
})

export const mainNav = css({
  display: 'flex',
  flexDirection: 'row',
  fontFamily: 'mono',
  fontSize: '1.25em',
  gap: '1.75em',
  textTransform: 'uppercase',
})
