You can customize the domain name of your GitHub Pages site with Flybook.

It's quite simple just add the `CNAME` file into your document root directory look like below

```shell
$ ls /path/to/project/docs
  docs
  |____advanced
  | \____theme.md
  |____basic
  | \____getting-started.md
  | \____install.md
  |____examples
  | \____syntax-highlight.md
  |____CNAME                   <---- add this file
  |____readme.md
```

And you want to know about `CNAME` in detail. Please see the references link

### References
- [Using a custom domain with GitHub Pages](https://help.github.com/articles/using-a-custom-domain-with-github-pages/)