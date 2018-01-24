import React from 'react'

interface Props {
  children: React.ReactNode
}

export const App: React.StatelessComponent<Props> = (props: Props) => (
  <div>{props.children}</div>
)
