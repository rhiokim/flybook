// @flow
import crypto from 'crypto'

const rand: string = crypto.randomBytes(8).toString('hex')
const defaultDescription = ''
// const defaultOGURL = ''
// const defaultOGImage = ''

type Props = {
  body: string,
  title: string,
  root: string,
  theme?: string,
  font?: string,
  codeStyle?: string
}

export default ({
  body,
  title,
  root = '',
  theme = 'light',
  font = 'Rubik|Unica+One',
  codeStyle = 'solarized-dark'
  }: Props) => {
  return `
    <!DOCTYPE html>
    <html>
      <meta charset="UTF-8" />
      <title>${title}</title>
      <meta
        name="description"
        content=${defaultDescription}
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link
        href="//fonts.googleapis.com/css?family=${font}"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="${root}static/css/normalize.css?${rand}" />
      <link rel="stylesheet" href="${root}static/css/flexboxgrid.min.css?${rand}" />
      <link rel="stylesheet" href="${root}static/css/github-flavored-markdown.css?${rand}" />
      <link rel="stylesheet" href="${root}static/css/${theme}.css?${rand}" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/${codeStyle}.min.css" />
      <style>
        body, .markdown-body {
          font-family: "${font}", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
      </style>
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
      <script src="${root}static/main.js?${rand}"></script>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `
}
