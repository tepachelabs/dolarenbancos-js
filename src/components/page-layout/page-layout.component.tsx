'use client'

import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { useBoolean } from 'usehooks-ts'

import { IconMenu } from '~/components/icons'
import { ToTop } from '~/components/to-top'

import { wrapper, header, logo, mainNav, nav, navTrigger, footer, footerNav, row } from './page-layout.styles'

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Histórico', path: '/#historico' },
  { label: 'Bots', path: '/#bots' },
]

const footerItems = [
  { label: 'Acerca', path: '/acerca' },
  { label: 'Términos', path: '/terminos' },
  { label: 'Privacidad', path: '/privacidad' },
]

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { setFalse, toggle, value } = useBoolean(false)

  return (
    <>
      <header className={ header }>
        <div className={ row }>
          <div className={ wrapper }>
            <Link href="/" onClick={ setFalse } className={ logo }>
              <h1><em>Dólar</em> en Bancos</h1>
            </Link>
            <button className={ navTrigger } onClick={ toggle }>
              <IconMenu/>
            </button>
          </div>
          <nav className={ value ? nav.active : nav.inactive }>
            <ul className={ mainNav }>
              { navItems.map(({ label, path }) => (
                <li key={ path }>
                  <Link href={ path } onClick={ setFalse }>{ label }</Link>
                </li>
              )) }
            </ul>
          </nav>
        </div>
      </header>

      <main>
        { children }
        <ToTop/>
      </main>

      <footer className={ footer }>
        <div className={ wrapper }>
          <h1 className={ logo }><em>Dólar</em> en Bancos</h1>
          <div>
            <ul className={ footerNav }>
              { footerItems.map(({ label, path }) => (
                <li key={ path }>
                  <Link href={ path }>{ label }</Link>
                </li>
              )) }
            </ul>
            <p>&copy; 2023 Dólar en Bancos. Algunos derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  )
}
