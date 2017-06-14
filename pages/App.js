// @flow
import React from 'react'
import Layout from '../components/layout'

type Props = {
  title: string;
  toc: any;
  contents: string;
  pkg: any;
  root: string;
}

const App = ({ title, toc, contents, pkg, root }: Props) => (
  <Layout className="wrap container-fluid" title={title} toc={toc} pkg={pkg} root={root}>
    <div
      className="markdown-body"
      dangerouslySetInnerHTML={{ __html: contents }}
    />
  </Layout>
)

module.exports = App
