## Generating production pages

```
  ...
  "scripts": {
    /* local */
    "docs": "flybook docs --outdir=out",
    /* production */
    "docs:prod": "flybook docs --outdir=out --prod"
    ...
  },
```

Flybook generates static web pages on your local environment and other places such as `gh-pages` branch of your github repository or your own server.

In local(= dev) environment, flybook doesn't need any configuration. But when you deploy static files—you publish them in production(= real) level—you must set some variables into `package.json` file as well as command line option `--prod` into your command, just like the example above.

See [BASIC > Configuration](../../basic/configuration) for more detailed information.
