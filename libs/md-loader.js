// @flow
import fs from 'fs'
import remark from 'remark'
import html from 'remark-html'
import hljs from 'remark-highlight.js'
import slug from 'remark-slug'
import headding from 'remark-autolink-headings'

const app = remark()
app.use([slug, headding, html])

export default (file: string): string => {
  let markdown: string = fs.readFileSync(file).toString('utf8')
  const { contents } = app.processSync(markdown)

  return contents
}
