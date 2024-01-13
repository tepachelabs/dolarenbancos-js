'use client'

import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'
import { useBoolean } from 'usehooks-ts'

import { wrapper, header, logo, mainNav, nav, navTrigger, footer } from './page-layout.styles'

const navItems = [
  { label: 'Inicio', path: '/' },
  { label: 'Histórico', path: '/#historico' },
  { label: 'Bots', path: '/#bots' },
]

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  const { toggle, value } = useBoolean(false)

  return (
    <>
      <header className={ header }>
        <div className={ wrapper }>
          <h1 className={ logo }><em>Dólar</em> en Bancos</h1>
          <nav className={ value ? nav.active : nav.inactive }>
            <ul className={ mainNav }>
              { navItems.map(({ label, path }) => (
                <li key={ path }>
                  <Link href={ path }>{ label }</Link>
                </li>
              )) }
            </ul>
          </nav>
          <button className={ navTrigger } onClick={ toggle }>Menú</button>
        </div>
      </header>

      <main>
        { children }
      </main>

      <footer className={ footer }>
        <div className={ wrapper }>
          <h1 className={ logo }><em>Dólar</em> en Bancos</h1>
          <p>&copy; 2023 Dólar en Bancos. Algunos derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
