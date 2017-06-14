// @flow
import React from 'react'

type ILink = {
  href: string;
  key: string;
  label: string;
}

type Props = {
  homepage: string;
  repository: {
    url: string;
  }
}

const links: ILink[] = [
].map((link: ILink, i: number) => {
  link.key = `nav-link-${i}`
  return link
})

const Nav = ({ homepage = '', repository }: Props) => (
  <nav className="nav-link">
    <a href={homepage}>Home</a>
    {links.map(({ key, href, label }) => <a href={href} key={key}>{label}</a>)}
    <a href={repository.url}>Github</a>
  </nav>
)

module.exports = Nav
