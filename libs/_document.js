const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

module.exports = ({ body, title, root = '', font = 'Rubik|Unica+One', codeStyle = 'solarized-dark'}) => {
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
      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};
