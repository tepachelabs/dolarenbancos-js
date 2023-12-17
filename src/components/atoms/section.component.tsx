import { FC, PropsWithChildren, ReactNode } from 'react'

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

  '& > h2': {
    marginBottom: '3rem',
  },

  lg: {
    paddingLeft: '0',
    paddingRight: '0',
  },
})

const heading = css({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: '3rem',
})

interface SectionProps {
  id?: string
  backgroundColor?: 'transparent' | 'primaryLight' | 'primaryLighter'
  padding?: string
  title?: string
  action?: ReactNode
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  action,
  backgroundColor = 'transparent',
  children,
  id,
  padding,
  title,
}) => {
  const showHeading = title || action

  return (
    <section id={ id } className={ cx(section, css({ backgroundColor, padding })) }>
      <div className={ wrapper }>
        {showHeading && (
          <div className={ heading }>
            { title && <h2>{ title }</h2> }
            { action }
          </div>
        ) }
        { children }
      </div>
    </section>
  )
}
