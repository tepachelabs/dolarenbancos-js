import { FC, PropsWithChildren, ReactNode } from 'react'

import { css, cva } from '../../../styled-system/css'

interface SectionProps {
  id?: string
  backgroundColor?: 'transparent' | 'primaryLight' | 'primaryLighter'
  size?: 'compact' | 'default'
  title?: string
  action?: ReactNode
}

export const Section: FC<PropsWithChildren<SectionProps>> = ({
  action,
  backgroundColor = 'transparent',
  children,
  id,
  size= 'default',
  title,
}) => {
  const showHeading = title || action

  return (
    <section id={ id } className={ section({ size, backgroundColor }) }>
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

/*
 * Styles
 */

const section = cva({
  base: {
    paddingLeft: '0',
    paddingRight: '0',
    width: '100%',
  },
  variants: {
    size: {
      default: {
        paddingTop: '6rem',
        paddingBottom: '6rem',
      },
      compact: {
        paddingTop: '2rem',
        paddingBottom: '0',
      },
    },
    backgroundColor: {
      transparent: {
        backgroundColor: 'transparent',
      },
      primaryLight: {
        backgroundColor: 'primaryLight',
      },
      primaryLighter: {
        backgroundColor: 'primaryLighter',
      },
    },
  },
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
