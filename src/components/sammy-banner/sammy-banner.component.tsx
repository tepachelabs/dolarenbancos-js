'use client'

import Image from 'next/image'

import {
  image,
  button,
  copyWrapper,
  benefitsList,
  elementsWrapper,
} from './sammy-banner.styles'

const BenefitsList = () => {
  return (
    <ul className={ benefitsList }>
      <li>
        Al abrir tu cuenta a través de dolarenbancos.com y depositar 100 dólares,
        ¡recibe tu tarjeta física gratis!
      </li>
    </ul>
  )
}

export const SammyBanner = () => {
  return (
    <>
      <div className={ elementsWrapper }>
        <Image
          width={100}
          height={100}
          className={ image }
          src="/sammy_logo.jpeg"
          alt="Sammy Logo"
        />
        <div className={ copyWrapper }>
          <h3>¿Quieres abrir una cuenta en dólares?</h3>
          <p>Prueba <strong>Sammy</strong></p>
        </div>
        <a
          className={ button }
          href="https://www.usesammy.com/en"
          target="_blank"
        >
          Abrir Cuenta
        </a>
      </div>
      <BenefitsList />
    </>
  )
}
