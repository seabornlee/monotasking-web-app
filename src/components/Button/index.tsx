import React from 'react'

interface Props {
  children: string | React.ReactNode
  className?: string
}

export const Button: React.StatelessComponent<Props> = (props: Props) => {
  const { children, ...rest } = props
  return (
    <button {...rest}>{children}</button>
  )
}
