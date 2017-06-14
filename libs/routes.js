// @flow
import { readFileSync } from 'fs'
import { join } from 'path'
import { safeLoad } from 'js-yaml'

module.exports = (targetDir: string) => {
  let routes
  const file = join(targetDir, 'toc.yml')

  try {
    routes = readFileSync(file, 'utf8')
    routes = safeLoad(routes)
  } catch (e) {
    throw new Error(
      `> No such toc.yml file exists as the document root: ${file}`
    )
  }

  return routes
}
