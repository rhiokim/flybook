// @flow
import React from 'react'
import type { Children } from 'react'
import classnames from 'classnames'

import Nav from './nav'
import Chap from './chap'

type NavItem = Object & {
  [key: string]: string
}

type Author = {
  url?: string,
  name?: string
}

type RepositoryType = 'git' | 'svn'

type Repository =
  | string
  | {
      type: RepositoryType,
      url: string
    }

type Pkg = {
  name: string,
  homepage?: string,
  author?: Author,
  repository: Repository
}

type Props = {
  children?: Children,
  title: string,
  className?: string,
  toc: NavItem,
  pkg: Pkg,
  root: string
}

// @TODO need to improve performance
const fixURI = (url: string = '') => {
  let arr = url.split('/')

  let res = arr.map(dir => {
    return encodeURIComponent(dir)
  })

  return res.join('/')
}

export default ({
  children,
  title = '',
  className,
  toc = {},
  pkg,
  root = ''
  }: Props) => {
  return (
    <div className={className}>

      <header className="site-header">
        <h1><a href={pkg.homepage}>{pkg.name}</a></h1>
        <Nav {...pkg} />
      </header>

      <section className="row main">
        <aside className="col-xs-12 col-sm-3 col-md-3 col-lg-3">
          {Object.keys(toc).map((key: string, i: number) => {
            let nav: NavItem = toc[key]
            return (
              <Chap title={key === '.' ? '' : key} key={i}>
                {Object.keys(nav).map((label: string) => {
                  let url = `${root}${nav[label].replace(/\.md/g, '.html')}`
                  return (
                    <li
                      key={label}
                      className={classnames({ active: title === label })}
                    >
                      <a href={fixURI(url)}>
                        {label}
                      </a>
                    </li>
                  )
                })}
              </Chap>
            )
          })}
        </aside>
        <article className="col-xs-12 col-sm-9 col-md-9 col-lg-9">
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
