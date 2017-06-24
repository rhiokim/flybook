// @flow
import { readFileSync } from 'fs'
import { join } from 'path'
import { safeLoad } from 'js-yaml'

type Routes = {
  [key: string]: string
}

export default (targetDir: string) => {
  let routes
  let routesObj: ?Routes
  const file = join(targetDir, 'toc.yml')

  try {
    routes = readFileSync(file, 'utf8')
    routesObj = (safeLoad(routes): ?Routes)
  } catch (e) {
    throw new Error(`> No such toc.yml file exists as the document root: ${file}`)
  }

  return routesObj
}
