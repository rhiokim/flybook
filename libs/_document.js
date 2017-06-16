// @flow
const defaultDescription = ''
// const defaultOGURL = ''
// const defaultOGImage = ''

type Props = {
  body: string,
  title: string,
  root: string,
  font?: string,
  codeStyle?: string
}

export default ({
  body,
  title,
  root = '',
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
      <link rel="stylesheet" href="${root}static/css/normalize.css" />
      <link rel="stylesheet" href="${root}static/css/flexboxgrid.min.css" />
      <link rel="stylesheet" href="${root}static/css/github-flavored-markdown.css" />
      <link rel="stylesheet" href="${root}static/css/main.css" />
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/${codeStyle}.min.css" />
      <style>
        body, .markdown-body {
          font-family: "${font}",
            "HelveticaNeue",
            "Helvetica Neue",
            Helvetica,
            Arial,
            sans-serif;
        }
      </style>
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>
      <script src="${root}/static/main.js"></script>
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `
}
