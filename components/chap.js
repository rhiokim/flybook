import React from 'react'

module.exports = ({ children, title }: Props) => (
  <div className="chap">
    <span className="chap-title">{title}</span>
    <ul>
      {children}
    </ul>
  </div>
)
