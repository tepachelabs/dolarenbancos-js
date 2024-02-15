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
          src="https://ik.imagekit.io/vkih1k0zz/sammy_logo.jpeg?updatedAt=1707946566231"
          alt="Sammy Logo"
        />
        <div className={ copyWrapper }>
          <h3>¿Quieres abrir una cuenta en dólares?</h3>
          <p>Prueba <strong>Sammy</strong></p>
        </div>
        <a
          className={ button }
          href="https://www.usesammy.com/es/dolarenbancos"
          target="_blank"
        >
          Abrir Cuenta
        </a>
      </div>
      <BenefitsList />
    </>
  )
}
