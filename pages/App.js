// @flow
import React from 'react'
import Layout from '../components/layout'

type NavItem = {
  [key: string]: string
}

type Author = {
  url?: string,
  name?: string
}

type Repository = {
  url?: string
}

type Pkg = {
  name: string,
  homepage?: string,
  author?: Author,
  repository?: Repository
}

type Props = {
  title: string,
  toc: NavItem,
  contents: string,
  pkg: Pkg,
  root: string
}

const App = ({ title, toc, contents, pkg, root }: Props) =>
  <Layout
    className="wrap container-fluid"
    title={title}
    toc={toc}
    pkg={pkg}
    root={root}
  >
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  </Layout>

export default App
