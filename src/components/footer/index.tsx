import { Footer as TepacheFooter } from '@tepachelabs/components'

import { footer } from '~/components/footer/footer.styles'

export const Footer = () => {
  return (
    <TepacheFooter
      className={ footer }
      title={{
        footerTitle: <h1>Your favorite h1</h1>,
        copyRightTitle: 'dolarenbancos',
      }}
      version="version 2"
      footerItems={{
        'MORE': [{
          title: 'WOLA',
          url: 'WE',
        }],
      }}
    />
  )
}
