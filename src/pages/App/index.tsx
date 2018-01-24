import React from 'react'

import { Button } from '../../components/Button'

import './index.scss'

const logo = require('../../assets/images/mono-logo-black.png')

interface Props {
  children: React.ReactNode
}

export const App: React.StatelessComponent<Props> = (props: Props) => (
  <div className='app-container'>
    <header>
      <img src={logo} alt='MonoToday'/>
    </header>
    <div className='new-task'>
      <input className='new-task-input' type='text' placeholder='添加 #接下来最应该开始的工作#'/>
      <Button type='primary' className='new-task-btn'><i className='icon icons-download'/></Button>
    </div>
    {props.children}
    <Button type='primary' className='start-mono-btn'>开始单核</Button>
    <footer>
      <a href='https://baike.baidu.com/item/%E5%8D%95%E6%A0%B8%E5%B7%A5%E4%BD%9C%E6%B3%95/22119461?fr=aladdin'>什么是单核工作法？</a>
    </footer>
  </div>
)
