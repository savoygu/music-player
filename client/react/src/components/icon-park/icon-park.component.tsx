import { Icon, IIconProps } from '@icon-park/react/es/runtime'
import { FC } from 'react'

import './icon-park.styles.scss'

type IconParkProps = {
  component: Icon
  className?: string
}

const IconPark: FC<IconParkProps & IIconProps> = ({
  component: Component,
  className,
  ...otherProps
}) => {
  return (
    <Component
      className={`cursor-pointer ${className}`}
      theme="outline"
      size={32}
      fill="#4b5563"
      strokeWidth={3}
      {...otherProps}
    />
  )
}

export default IconPark
