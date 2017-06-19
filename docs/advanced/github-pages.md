To deploy

### Prerequsite

Install two modules, `npm install flybook gh-pages --save-dev`

### Setting

First add two kind of `npm script` into `package.json` file

_package.json_
```js
{
  ...,
  "scripts": {
    "docs": "flybook docs --outdir=out",
    "pages": "npm run docs && gh-pages -d out"
  }
}
```

And then run `npm run pages` after finish that open `https://[account].github.io/[project-name]`

It's done. Quite simple :)