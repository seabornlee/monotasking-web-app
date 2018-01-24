import React from 'react'
import QuickList from './pages/QuickList'

interface Props {
  children: React.ReactNode
}

const App: React.StatelessComponent<Props> = (props: Props) => (
  <div>{props.children}</div>
)

export default App
