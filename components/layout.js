import React from "react";
import classnames from "classnames";

import Nav from "./nav";
import Chap from "./chap";

module.exports = ({
  children,
  title = "",
  className,
  toc = {},
  pkg = {}
}: Props) => (
  <div className={className}>

    <header className="site-header">
      <h1><a href="/">{pkg.name}</a></h1>
      <Nav {...pkg.repository} />
    </header>

    <section className="main">
      <aside>
        {Object.keys(toc).map((key, i) => (
          <Chap title={key} key={i}>
            {Object.entries(toc[key]).map((item, i) => (
              <li key={i} className={classnames({ active: title === item[0] })}>
                <a href={`/${item[1].replace(/\.md/g, "")}`}>{item[0]}</a>
              </li>
            ))}
          </Chap>
        ))}
      </aside>
      <article>
        {children}
      </article>
    </section>

    {pkg.author
      ? <footer>
          © 2017 <a href={pkg.author.url}>{pkg.author.name || pkg.name}</a>
          . All rights reserved.
        </footer>
      : null}
  </div>
);
