# FlyBook
Just write markdown, Flybook will create your book.

`FlyBook` is a simple utility to generate static website. This is inspired by [funbook](https://funbook.js.org/) and [next.js export functionality](https://zeit.co/blog/next)

Rewrited using by **React** and **React DOM Server**

## Goals
This is the simplest way to generate static web site that look like

## How to use flybook

For example, Flybook documentation structure look like below
```
$ ls /path/to/project/docs
docs
|____advanced
| \____theme.md
|____basic
| \____getting-started.md
| \____install.md
|____examples
| \____syntax-highlight.md
|____index.md
```

**globally**
```
$ npm i -g flybook
$ cd /path/to/project

$ flybook docs
> FlyBook was generated at /Users/rhio/Works/my/fly-book/out
```

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

## Development

Turn on the auto build mode after `npm install`
```
$ git clone git@github.com:rhiokim/flybook
$ cd flybook
$ npm install
$ npm run build
```

You are able to see the notification with your code changes automatically

* npm run release   // build
* npm run docs      // generate a book with newest code

## TODO
- [ ] Add style widget to change font style
- [ ] Add style widget to change syntax highlight
  - using highlight.js provided cdnjs.com
- [ ] Add `next` and `prev` link
- [ ] Theme
- [ ] PDF, EPUB
- [ ] i18n

## License
MIT