![](images/logo-250x250.png)

## getting started

1. Wirte markdown docs
2. Run `flybook`

### Write contents

Create `docs` directory and then write `basic.md` and `advanced.md`

* docs/basic.md

```
## Basic

Basic Content
```

* docs/advanced.md

```
## Advanced

Advanced Content
```

### Add npm scripts

package.json

```js
  ,
  "scripts": {
    "docs": "flybook docs"
  },
  ...
```

and then run `npm run docs`

### Tutorial Video

<iframe width="100%" height="315" src="https://www.youtube.com/embed/nqJfprV3KUI" frameborder="0" allowfullscreen></iframe>