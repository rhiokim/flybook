const defaultDescription = "";
const defaultOGURL = "";
const defaultOGImage = "";

module.exports = ({ body, title }) => {
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
        href="//fonts.googleapis.com/css?family=Rubik|Unica+One"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/static/css/normalize.css" />
      <link rel="stylesheet" href="/static/css/flexboxgrid.min.css" />
      <link rel="stylesheet" href="/static/css/main.css" />

      <body>
        <div id="root">${body}</div>
      </body>
    </html>
  `;
};
