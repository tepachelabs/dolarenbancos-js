import { FC } from 'react'
import { useBoolean, useEffectOnce } from 'usehooks-ts'

import { IconChevronUp } from '~/components/icons'

import { button } from './to-top.styles'

const heightLimit = 500

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
      { isVisible && (
        <button onClick={ scrollToTop } className={ button }>
          <IconChevronUp/>
          <p>Ir arriba</p>
        </button>
      ) }
    </>
  )
}
