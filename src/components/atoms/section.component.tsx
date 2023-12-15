import { FC, PropsWithChildren } from 'react'

import { css, cx } from '../../../styled-system/css'

const section = css({
  padding: '6rem 0',
  width: '100%',
})

const wrapper = css({
  margin: '0 auto',
  maxWidth: 'pageWidth',
  paddingLeft: '1rem',
  paddingRight: '1rem',

  '& h2': {
    marginBottom: '3rem',
  },

  lg: {
    paddingLeft: '0',
    paddingRight: '0',
  },
})

interface SectionProps {
  id?: string
  backgroundColor?: 'transparent' | 'primaryLight' | 'primaryLighter'
  padding?: string
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  backgroundColor = 'transparent',
  children,
  id,
  padding,
}) => {
  return (
    <section id={ id } className={ cx(section, css({ backgroundColor, padding })) }>
      <div className={ wrapper }>{ children }</div>
    </section>
  )
}
