import { FC } from 'react'

import { CommonIconProps } from '~/components/icons/common.props'

export const IconMenu: FC<CommonIconProps> = ({ height = 48 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75" height={ height }>
      <rect width="40" height="4.43" x="17.5" y="29.29" rx="2.21" ry="2.21" style={ { fill: '#fff', strokeWidth: 0 } }/>
      <rect width="40" height="4.43" x="17.5" y="42.29" rx="2.21" ry="2.21" style={ { fill: '#fff', strokeWidth: 0 } }/>
    </svg>
  )
}
