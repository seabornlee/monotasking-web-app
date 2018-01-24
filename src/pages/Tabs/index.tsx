import React from 'react'
import { NavLink } from 'react-router-dom'

import './index.scss'

interface Props {}

export const Tabs: React.StatelessComponent<Props> = (props: Props) => (
  <ul className='mono-tabs'>
    <li><NavLink to='/quick-list' activeClassName='active'>快捷清单</NavLink></li>
    <li><NavLink to='/grass-catcher' activeClassName='active'>集草器</NavLink></li>
    <li><NavLink to='/completed' activeClassName='active'>成就</NavLink></li>
  </ul>
)
