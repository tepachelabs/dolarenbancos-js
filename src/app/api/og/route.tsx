import { log } from '@logtail/next'
import { ImageResponse } from 'next/og'
import { CSSProperties } from 'react'

import { prettifyDate } from '~/lib/utils'

export const dynamic = 'force-dynamic' // defaults to force-static
export const runtime = 'edge'

export async function GET (request: Request) {
  const anton = fetch(
    new URL('../../../../public/anton-regular.ttf', import.meta.url)
  ).then((res) => res.arrayBuffer())

  try {
    const { searchParams } = new URL(request.url)

    const hasPrice = searchParams.has('price')
    const price = hasPrice ? Number(searchParams.get('price')) : 0

    const content = (
      <div style={ styles.wrapper }>
        <h2 style={ styles.text }>Precio de referencia:</h2>
        <h1 style={ styles.price }>1 USD = { price } MXN</h1>
        <h3 style={ styles.caption }>
          { prettifyDate(new Date()) } - Fuente: dolarenbancos.com
        </h3>
      </div>
    )

    return new ImageResponse(content, {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Anton',
          data: await anton,
          style: 'normal',
          weight: 800,
        },
      ],
    })
  } catch (e: any) {
    log.error(`${ e.message }`)
    return new Response('Failed to generate the image', {
      status: 500,
    })
  }
}

const commonTextStyles = {
  color: '#7DAF47',
  lineHeight: '0.85',
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    backgroundColor: '#F4F8F4',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  text: {
    ...commonTextStyles,
    fontSize: '5rem',
    fontWeight: 'bolder',
  },
  price: {
    ...commonTextStyles,
    fontSize: '9rem',
    fontWeight: 'bolder',
  },
  caption: {
    ...commonTextStyles,
    fontSize: '3rem',
    fontWeight: 'bolder',
  },
}

