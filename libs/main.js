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

let pkg = { name: 'FlyBook', homepage: '' }

try {
  pkg = deepAssign(pkg, require(join(process.cwd(), 'package.json')))
} catch (e) {}

const Html = (title, contents, root, routes) => {
  return _document({
    title: title,
    root: root,
    body: renderToStaticMarkup(
      createElement(App, { title, contents, toc: routes, pkg, root })
    )
  })
}

const makeIndexPage = (docDir, outDir, routes) => {
  let contents
  let html

  const loadIndex = docDir => {
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

  html = Html(pkg.name, contents, '', routes)

  /* gen new files */
  writeFileSync(join(outDir, 'index.html'), html, { encoding: 'utf8' })
}

module.exports = ({ docDir, outDir, silent, prod }) => {
  const routes = routeTable(docDir)

  if (!prod) {
    pkg.homepage = '/'
  }

  /* clean previous files */
  del.sync([join(outDir, '**/*')])

  // create output directory
  mkdirp.sync(outDir)

  //
  makeIndexPage(docDir, outDir, routes)

  Object.keys(routes).forEach(key => {
    const subRoutes = routes[key]

    for (let title in subRoutes) {
      let file = subRoutes[title]

      let outputDir = join(outDir, file.replace(/\.md$/, ''))
      let outputFile = join(outputDir, 'index.html')

      let contents = mdLoader(join(docDir, file))
      let html = Html(title, contents, relative(outputDir, outDir) + sep, routes)

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

  copy(join(__dirname, '..', '..', 'static'), join(outDir, 'static')).then(result => {
    console.log(`> FlyBook was generated at ${outDir}`)
  })
}
