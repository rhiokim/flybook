// @flow
import { writeFileSync, existsSync } from 'fs'
import { join, relative, sep } from 'path'
import copy from 'recursive-copy'
import del from 'del'
import mkdirp from 'mkdirp'
import deepAssign from 'deep-assign'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import routeTable from './routes'
import mdLoader from './md-loader'
import _document from './_document'
import App from '../pages/App'

type Props = {
  docDir: string,
  outDir: string,
  silent: boolean,
  prod: boolean,
  font?: string,
  codeStyle?: string
}

let pkg = {
  name: 'Flybook',
  description: 'Flybook',
  homepage: '',
  author: {},
  repository: {}
}

try {
  // https://wietse.loves.engineering/ignore-a-flowtype-error-on-a-specific-line-14cdfa70a739
  // $FlowFixMe
  pkg = deepAssign(pkg, require(join(process.cwd(), 'package.json').toString()))
} catch (e) {}

const Html = (
  title: string,
  contents: string = '',
  root: string,
  routes: any,
  font?: string,
  codeStyle?: string
) => {
  return _document({
    title,
    root,
    font,
    codeStyle,
    body: renderToStaticMarkup(
      createElement(App, { title, contents, toc: routes, pkg, root })
    )
  })
}

const makeIndexPage = (
  docDir: string,
  outDir: string,
  routes: any,
  font?: string,
  codeStyle?: string
) => {
  let contents: string
  let html: string

  const loadIndex = (docDir: string) => {
    contents = mdLoader(join(docDir, 'readme.md'))
    return contents
  }

  if (!existsSync(join(docDir, 'readme.md'))) {
    if (!existsSync(join(process.cwd(), 'readme.md'))) {
      console.log(`> No 'readme.md' file found in ${docDir} and project root`)
      process.exit(1)
    } else {
      contents = loadIndex(process.cwd())
    }
  } else {
    contents = loadIndex(docDir)
  }

  html = Html(pkg.name, contents, '', routes, font, codeStyle)

  /* gen new files */
  writeFileSync(join(outDir, 'index.html'), html, { encoding: 'utf8' })
}

module.exports = ({ docDir, outDir, silent, prod, font, codeStyle }: Props) => {
  const routes: { [key: string]: any } = routeTable(docDir) || {}

  // if not production mode, homepage is '/' path
  if (!prod) {
    pkg.homepage = '/'
  }

  /* clean previous files */
  del.sync([join(outDir, '**', '*')])

  // create output directory
  mkdirp.sync(outDir)

  //
  makeIndexPage(docDir, outDir, routes, font, codeStyle)

  Object.keys(routes).forEach(key => {
    const subRoutes = routes[key] || {}

    for (let title in subRoutes) {
      let file = subRoutes[title]

      let outputDir = join(outDir, file.replace(/\.md$/, ''))
      let outputFile = join(outputDir, 'index.html')

      let contents = mdLoader(join(docDir, file))
      let html = Html(
        title,
        contents,
        relative(outputDir, outDir) + sep,
        routes,
        font,
        codeStyle
      )

      /* mkdir output dir */
      mkdirp.sync(outputDir)

      /* gen new files */
      writeFileSync(outputFile, html, { encoding: 'utf8' })

      // log
      if (!silent) {
        console.log('>', key, '-', title, '\n', outputFile)
      }
    }
  })

  copy(
    join(__dirname, '..', '..', 'static'),
    join(outDir, 'static')
  ).then(result => {
    console.log(`> FlyBook was generated at ${outDir}`)
  })
}
