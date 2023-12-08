import Link from 'next/link'
import { FC, PropsWithChildren } from 'react'

import { body, bodySection, centeredSection, footer, header, mainNav } from './page-layout.styles'
import { cx } from '../../../styled-system/css'
import { container } from '../../../styled-system/patterns'

const navItems = [
  { label: 'Inicio', path: '/' },
]

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className={ header }>
        <div className={ centeredSection }>
          <h1>Dólar en Bancos</h1>
          <nav>
            <ul className={ mainNav }>
              { navItems.map(({ label, path }) => (
                <li key={ path }>
                  <Link href={ path }>{ label }</Link>
                </li>
              )) }
            </ul>
          </nav>
        </div>
      </header>

      <main className={ cx(container(), body) }>
        <div className={ bodySection }>
          { children }
        </div>
      </main>

      <footer className={ footer }>
        <div className={ centeredSection }>
          <p>&copy; 2017-{ new Date().getFullYear() } Dólar en bancos. Algunos derechos reservados.</p>
        </div>
      </footer>
    </>
  )
}
