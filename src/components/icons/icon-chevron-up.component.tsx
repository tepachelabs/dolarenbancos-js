import { FC } from 'react'

import { CommonIconProps } from './common.props'

export const IconChevronUp: FC<CommonIconProps> = ({ height = 48 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75" height={ height }>
      <rect width="22.21" height="4.43" x="32.68" y="35.29" rx="2.21" ry="2.21"
        style={ { fill: '#fff', strokeWidth: 0 } } transform="rotate(45 43.788 37.498)"/>
      <rect width="22.04" height="4.43" x="20.13" y="35.35" rx="2.21" ry="2.21"
        style={ { fill: '#fff', strokeWidth: 0 } } transform="rotate(-45 31.15 37.567)"/>
    </svg>
  )
}
