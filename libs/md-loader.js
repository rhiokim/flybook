// @flow
import fs from 'fs'
import remark from 'remark'
import html from 'remark-html'
import hljs from 'remark-highlight.js'
import slug from 'remark-slug'
import headding from 'remark-autolink-headings'
import strip from 'strip-markdown'
import trimNewLines from 'trim-newlines'

type Contents = {
  contents: string,
  markdown: string
}

const app = remark()
app.use([slug, headding, html])

const mdStrip = remark()
mdStrip.use(strip)

export default (file: string): Contents => {
  let markdown: string = fs.readFileSync(file).toString('utf8')
  const { contents } = app.processSync(markdown)
  const striped = mdStrip.processSync(markdown)

  return { contents, markdown: trimNewLines(striped.contents) }
}
