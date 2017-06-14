## To generate for production

```
  ...
  "scripts": {
    /* local */
    "docs": "flybook docs --outdir=out"
    /* production */
    "docs:prod": "flybook docs --outdir=out --prod"
    ...
  },
```

Flybook can generate static website for local environment and the others such as `gh-pages` or your own server

There is no required configuration for local(= dev) environment. But if you'll deploy static files which is genereted by Flybook. You should be set the some variable into `package.json` file

See [Configuration](../../basic/configuration/index.html)