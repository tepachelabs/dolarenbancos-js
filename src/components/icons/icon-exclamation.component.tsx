import { FC } from 'react'

import { svg } from './common-icon.styles'
import { CommonIconProps } from './common.props'

export const IconExclamation: FC<CommonIconProps> = ({ height = '48px' }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75" height={ height } className={ svg }>
      <circle cx="37.5" cy="37.56" r="25" style={ { fill: '#1f201f', strokeWidth: 0 } }/>
      <circle cx="37.5" cy="51" r="2.5" style={ { fill: '#fff', strokeWidth: 0 } }/>
      <rect width="4" height="21.75" x="35.5" y="21.66" rx="2" ry="2" style={ { fill: '#fff', strokeWidth: 0 } }/>
    </svg>
  )
}
