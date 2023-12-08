import { css } from '../../../styled-system/css'

export const header = css({
  backgroundColor: 'white',
  borderBottom: '1px solid',
  borderColor: 'lightGrey',
  height: '4rem',
})

export const body = css({
  fontFamily: 'body',
  minHeight: 'calc(100vh - 14rem)',
})

export const footer = css({
  fontFamily: 'body',
  backgroundColor: 'black',
  color: 'white',
  height: '10rem',
})

const sectionStyles = {
  maxWidth: 'pageWidth',
  margin: '0 auto',
  p: '1rem',
}

export const bodySection = css(sectionStyles, {
  display: 'flex',
  gap: '1.75em',
  flexDirection: 'column',
})

export const centeredSection = css(sectionStyles, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const mainNav = css({
  display: 'flex',
  flexDirection: 'row',
  gap: '1.75em',
})
