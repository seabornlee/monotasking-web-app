import React from 'react'

interface Props {
  children: React.ReactNode
}

export const App: React.StatelessComponent<Props> = (props: Props) => (
  <div>
    <input type='text' placeholder='添加 #接下来最应该开始的工作#'/>
    {props.children}
    <button>开始单核</button>
    <i className='icon icons-download'/>
    <a href='#'>关于单核工作法</a>
  </div>
)
