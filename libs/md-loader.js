// @flow
import fs from 'fs'
import remark from 'remark'
import html from 'remark-html'
import hljs from 'remark-highlight.js'
import slug from 'remark-slug'
import headding from 'remark-autolink-headings'

module.exports = (file: string) => {
  let markdown = fs.readFileSync(file).toString('utf8')
  let vfile = remark().use([slug, headding, hljs, html]).processSync(markdown)

  return vfile.contents
}
