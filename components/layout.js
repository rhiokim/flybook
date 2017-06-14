// @flow
import React from 'react'
import type {Children} from 'react'
import classnames from 'classnames'

import Nav from './nav'
import Chap from './chap'

type Props = {
  children?: Children;
  title: string;
  className?: string;
  toc: any;
  pkg: any;
  root: string;
};

type Nav = {
  [key: string]: string
}

module.exports = ({
  children,
  title = '',
  className,
  toc = {},
  pkg = {},
  root = ''
  }: Props) => {
  return (
    <div className={className}>

      <header className="site-header">
        <h1><a href={pkg.homepage}>{pkg.name}</a></h1>
        <Nav {...pkg} />
      </header>

      <section className="main">
        <aside>
          {Object.keys(toc).map((key: string, i: number) => {
            let nav: Nav = toc[key]
            return (
              <Chap title={key === '.' ? '' : key} key={i}>
                {Object.keys(nav).map((label: string) =>
                  <li
                    key={label}
                    className={classnames({ active: title === label })}
                  >
                    <a href={`${root}${nav[label].replace(/\.md/g, '')}/index.html`}>{label}</a>
                  </li>
                )}
              </Chap>
            )
          })}
        </aside>
        <article>
          {children}
        </article>
      </section>

      {pkg.author
        ? <footer>
            © 2017 <a href={pkg.author.url}>{pkg.author.name || pkg.name}</a>
            . All rights reserved.
        </footer>
        : null}
    </div>
  )
}
