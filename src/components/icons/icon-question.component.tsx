/* eslint-disable max-len */
import { FC } from 'react'

import { CommonIconProps } from './common.props'

export const IconQuestion: FC<CommonIconProps> = ({ height = 48 }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75" height={ height }>
      <path
        d="M48.76 30.75c0 4.45-3.93 8.16-9.12 8.97v3.07c0 1.24-.93 2.24-2.08 2.24h-.12c-1.15 0-2.08-1-2.08-2.24v-4.77c0-.94.61-1.75 1.47-2.03.19-.06.38-.1.59-.1h.16c.2 0 .4-.01.59-.03.51-.03 1-.1 1.47-.21 2.93-.66 5.12-2.64 5.12-4.9 0-2.78-3.32-5.13-7.26-5.13s-7.12 2.25-7.25 4.96c-.1 1.01-.96 1.79-2 1.79s-1.95-.83-2-1.88c0-.18.01-.35.03-.52 0-.01 0-.02.01-.02.5-4.67 5.33-8.33 11.21-8.33 6.21 0 11.26 4.09 11.26 9.13Z"
        style={ { fill: '#fff', strokeWidth: 0 } }/>
      <circle cx="37.5" cy="51" r="2.5" style={ { fill: '#fff', strokeWidth: 0 } }/>
    </svg>
  )
}
