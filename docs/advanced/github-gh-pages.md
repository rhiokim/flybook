To deploy

### Prerequsite

Install two modules, `npm install flybook gh-pages --save-dev`

### Setting

`package.json`
```js
{
  ...,
  "scripts": {
    "docs": "flybook docs --outdir=out",
    "pages": "gh-pages -d out"
  }
}
```

Open `https://[account].github.io/[project-name]`. It's done

Actually **FlyBook** is not dedicated github.
So it doesn't work well on github because path that is published in gh-pages branch on github will be broken

No worry! you can fix easily

### To Fix, wrong path of assets

Install one more NPM module `replace`. It'll be able to replace words in the file [see more](https://www.npmjs.com/package/replace)

```
$ npm install replace --save-dev
```

`package.json`
```js
{
  ...,
  "scripts": {
    "docs": "flybook docs --outdir=out",
    "pages": "npm run docs && npm run fix:link && npm run fix:static && gh-pages -d out",
    "fix:link": "replace '<a href=\"/' '<a href=\"/YOUR-PROJECT-NAME/' ./out -r -s --include='*.html'",
    "fix:static": "replace '/static/' '/YOUR-PROJECT-NAME/static/' ./out -r -s --include='*.html'"
  }
}
```

And then `npm run pages` and then open `https://[account].github.io/[project-name]` again