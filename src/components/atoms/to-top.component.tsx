import { FC } from 'react'
import { useBoolean, useEffectOnce } from 'usehooks-ts'

import { button } from '~/components/atoms/button.cva'

import { css } from '../../../styled-system/css'

const heightLimit = 500

const styles = css({
  ...button.raw(),
  bottom: '1em',
  position: 'fixed',
  right: '1em',

  lg: {
    bottom: '13em',
  },
})

export const ToTop: FC = () => {
  const { setValue: setIsVisible, value: isVisible } = useBoolean(false)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  useEffectOnce(() => {
    window.addEventListener('scroll', listenToScroll)
    return () =>
      window.removeEventListener('scroll', listenToScroll)
  })

  const listenToScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop

    if (winScroll > heightLimit) {
      !isVisible && setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  return (
    <>
      { isVisible && <button onClick={ scrollToTop } className={ styles }>Ir Arriba</button> }
    </>
  )
}
