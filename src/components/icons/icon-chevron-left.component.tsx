import { FC } from 'react'

import { CommonIconProps } from './common.props'

export const IconChevronLeft: FC<CommonIconProps> = ({ height = 48 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75" height={ height }>
      <rect width="22.21" height="4.43" x="24.18" y="29.06" rx="2.21" ry="2.21"
        style={ { fill: '#fff', strokeWidth: 0 } } transform="rotate(-45 35.284 31.275)"/>
      <rect width="22.04" height="4.43" x="24.33" y="41.7" rx="2.21" ry="2.21"
        style={ { fill: '#fff', strokeWidth: 0 } } transform="rotate(-135 35.347 43.914)"/>
    </svg>
  )
}
