// @flow
import React from 'react'
import type { Children } from 'react'

type Props = {
  children?: Children,
  title: string
}

export default ({ children, title }: Props) =>
  <div className="chap">
    <span className="chap-title">{title}</span>
    <ul>
      {children}
    </ul>
  </div>
