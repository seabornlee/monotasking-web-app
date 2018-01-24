import React from 'react'

import './index.scss'

interface Props {
  children?: string | React.ReactNode
  type?: 'default' | 'primary' | 'success'
  className?: string
}

export const Button: React.StatelessComponent<Props> = (props: Props) => {
  const { children, type = 'default', className, ...rest } = props
  return (
    <button className={`btn btn-${type} ${className}`} {...rest}>{children}</button>
  )
}
