import { Footer as TepacheFooter } from '@tepachelabs/components'

import { footer } from '~/components/footer/footer.styles';

export const Footer = () => {

  return (
      <TepacheFooter
        className={ footer }
        title={{
          footerTitle: <img src="https://picsum.photos/200/300" alt="Some picture" />,
          copyRightTitle: 'dolarenbancos'
        }}
        version="version 2"
        footerItems={{
          'MORE': [{
            title: 'WOLA',
            url: 'WE',
          }]
        }}
      />
  );
};