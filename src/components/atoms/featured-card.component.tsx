import Image from 'next/image'
import { FC, PropsWithChildren } from 'react'

import { button } from '~/components/atoms/button.cva'
import { Card } from '~/components/atoms/card.component'

import { css } from '../../../styled-system/css'

interface FeaturedCardProps {
  body: string
  title: string
  imgSrc: string
  cta: {
    text: string
    href: string
  }
}

export const FeaturedCard: FC<PropsWithChildren<FeaturedCardProps>> = ({
  body,
  cta,
  imgSrc,
  title,
}) => {
  return (
    <Card className={ styles.card }>
      <Image src={ imgSrc } alt={ title } width="200" height="200"/>
      <div className={ styles.wrapper }>
        <h3>{ title }</h3>
        <p>{ body }</p>
        <a className={ button() } href={ cta.href } target="_blank" rel="noreferrer noopener">{ cta.text }</a>
      </div>
    </Card>
  )
}

const styles = {
  card: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3em',
    marginBottom: '2rem',
    padding: '2em 2.5em',
    '& h3': {
      fontSize: '2rem',
      marginBottom: '0',
    },
    '& img': {
      height: '200px',
      margin: '0 auto',
      width: '200px',
    },
    md: {
      flexDirection: 'row-reverse',
    },
  }),
  wrapper: css({
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5em',
  }),
}
