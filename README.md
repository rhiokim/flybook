# FlyBook
Just write markdown, Flybook will create your book.

`FlyBook` is a simple utility to generate static website. This is inspired by [funbook](https://funbook.js.org/) and [next.js export functionality](https://zeit.co/blog/next)

Rewrited using by **React** and **React DOM Server**

## Goals
This is the simplest way to generate static web site that look like

## How to use flybook

**with NPM Project**
```
$ cd /path/to/project
$ npm install flybook --save-dev
$
$ vi package.json

  ,
  "scripts": {
    ...,
    "docs": "flybook docs --outdir=out"
  },
  ...
// after save

$ npm run docs
```


**globally**
```
$ npm i -g flybook
$ cd /path/to/project
$ ls [DOCUMENT_ROOT]
[DOCUMENT_ROOT]
|____advanced
| \____theme.md
|____basic
| \____getting-started.md
| \____install.md
|____examples
| \____syntax-highlight.md
|____index.md


$ flybook docs
```

## TODO
- [ ] Add style widget to change font style
- [ ] Add style widget to change syntax highlight
  - using highlight.js provided cdnjs.com
- [ ] Add `next` and `prev` link
- [ ] Theme
```bash
$ cd your-project
$ npm install fly-book-style-solarized-dark
$ fly-book docs --theme=solarized-dark
```
- [ ] PDF, EPUB
- [ ] i18n

## License
MIT