import { FC } from 'react'
import { Icon, IIconProps } from '@icon-park/react/es/runtime'

import './icon-park.styles.scss'

interface IconParkProps {
  Comp: Icon
  className?: string
  onClick?: () => void
}

const IconPark: FC<IconParkProps & IIconProps> = ({
  Comp,
  className,
  onClick,
  ...otherProps
}) => {
  return (
    <Comp
      className={`cursor-pointer ${className}`}
      theme="outline"
      size={32}
      fill="#4b5563"
      strokeWidth={3}
      {...otherProps}
      onClick={onClick}
    />
  )
}

export default IconPark
