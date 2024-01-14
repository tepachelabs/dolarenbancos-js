/* eslint-disable max-len */

import { Section } from '~/components/atoms/section.component'
import { PageLayout } from '~/components/page-layout'

export default async function Terms () {
  return (
    <PageLayout>
      <Section title="Términos y Condiciones" size="fullPage">
        <p>Bienvenido a Dólar en Bancos. Al acceder y utilizar nuestro sitio web, usted (el &#8220;Usuario&#8221;)
          acepta y acuerda cumplir con los siguientes términos y condiciones (los &#8220;Términos&#8221;). Si no está de
          acuerdo con estos Términos, por favor no utilice nuestro sitio.</p>
        <p><b>Descripción del Servicio:</b> Dólar en Bancos es una plataforma informativa que proporciona datos
          recopilados de fuentes públicas. Nuestro objetivo es informar a los usuarios sobre los precios del dólar en
          pesos mexicanos ofrecidos por los diferentes bancos en México.</p>
        <p><b>Uso del Servicio:</b> El servicio está destinado solo para consultas personales a través de nuestra página
          web o bots de mensajería instantánea. Se prohíbe el acceso y uso del servicio mediante macros, robots
          automatizados u otras formas de extracción de datos. La redistribución de la información es permitida citando
          a Dólar en Bancos como fuente.</p>
        <p><b>Propiedad Intelectual:</b> Los logos y nombres de los bancos mencionados en nuestro sitio son marcas
          registradas de sus respectivos propietarios y se utilizan únicamente con fines informativos.</p>
        <p><b>Limitación de Responsabilidad:</b> Dólar en Bancos no se responsabiliza por el mal uso de la información
          proporcionada en el sitio. La exactitud de la información no está garantizada, ya que depende de fuentes
          públicas que podrían contener errores.</p>
        <p><b>Enlaces a Terceros:</b> Nuestro sitio puede contener enlaces a sitios web de terceros. No somos
          responsables del contenido o las prácticas de privacidad de estos sitios externos.</p>
        <p><b>Modificaciones del Servicio y Términos:</b> Nos reservamos el derecho de modificar o interrumpir el
          servicio, así como los Términos, en cualquier momento y sin previo aviso. Es responsabilidad del Usuario
          revisar periódicamente estos Términos.</p>
        <p><b>Terminación del Servicio:</b> Nos reservamos el derecho de terminar o restringir el acceso del Usuario a
          nuestro servicio en caso de detectar un uso indebido.</p>
        <p><b>Ley Aplicable y Resolución de Disputas:</b> Estos Términos se rigen por las leyes de México. Cualquier
          disputa relacionada con estos Términos será resuelta en los tribunales competentes de México.</p>
        <p>Al utilizar Dólar en Bancos, usted acepta estos Términos y Condiciones.</p>
      </Section>
    </PageLayout>
  )
}
