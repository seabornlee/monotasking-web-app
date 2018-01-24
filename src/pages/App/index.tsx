import React from 'react'

import { Button } from '../../components/Button'

import './index.scss'

interface Props {
  children: React.ReactNode
}

export const App: React.StatelessComponent<Props> = (props: Props) => (
  <div className='app-container'>
    <div className='input-group'>
      <input className='new-task' type='text' placeholder='添加 #接下来最应该开始的工作#'/>
      <Button className='btn-add-task'><i className='icon icons-download'/></Button>
    </div>
    {props.children}
    <button>开始单核</button>
    <a href='#'>关于单核工作法</a>
  </div>
)
