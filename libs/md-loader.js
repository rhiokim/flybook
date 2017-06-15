// @flow
import fs from 'fs'
import remark from 'remark'
import html from 'remark-html'
import hljs from 'remark-highlight.js'
import slug from 'remark-slug'
import headding from 'remark-autolink-headings'

const app = remark()
app.use([slug, headding, hljs, html])

module.exports = (file: string): string => {
  let markdown: string = fs.readFileSync(file).toString('utf8')
  let vfile = app.processSync(markdown)

  return vfile.contents
}
