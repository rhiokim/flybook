## Styling

### Font
[Google Fonts](https://fonts.google.com) is great service to use the web font.

Basically **Flybook** work with Google's Web Fonts. So if you want to change the font for static site, please use `--font` option when run flybook commend

```js
  ,
  "scripts": {
    "docs": "flybook docs --outdir=out --font=[GOOGLE_FONT_NAME_HERE]"
  },
  ...
```

### Syntax Highlighting
[Highlight.js](https://highlightjs.org) is awesome open source project for code syntax highligting
As you know, it being used by lots of project. Likewise **Flybook**

To use this. please use `--codeStyle` option with [highlight styles](https://highlightjs.org/static/demo/)

```js
  ,
  "scripts": {
    "docs": "flybook docs --outdir=out --codeStyle=[HIGHLIGHT_STYLE_NAME]"
  },
  ...
```

### Theme

Only support `light` and `dark` theme

```js
  ,
  "scripts": {
    "docs": "flybook docs --outdir=out --theme=dark"
  },
  ...
```

### Tutorial video

<iframe width="560" height="315" src="https://www.youtube.com/embed/BFzFAsjJN7c" frameborder="0" allowfullscreen></iframe>