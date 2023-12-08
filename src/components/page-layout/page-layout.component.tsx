import { FC, PropsWithChildren } from "react";
import Link from 'next/link'
import { body, footer, header } from "./page-layout.styles";

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Bots', path: '/bots' },
];

export const PageLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <header className={ header }>
        <h1>Dolar en bancos</h1>
        <nav>
          <ul>
            { navItems.map(({ label, path }) => (
              <li key={ path }>
                <Link href={ path }>{ label }</Link>
              </li>
            )) }
          </ul>
        </nav>
      </header>

      <main className={ body }>
        { children }
      </main>

      <footer className={ footer }>
        <p>&copy; TepacheLabs</p>
      </footer>
    </>
  );
}
