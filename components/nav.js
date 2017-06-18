// @flow
import React from 'react'

type ILink = {
  href: string,
  key: string,
  label: string
}

type Props = {
  homepage?: string,
  repository?: {
    url?: string
  }
}

const links: ILink[] = [].map((link: ILink, i: number) => {
  link.key = `nav-link-${i}`
  return link
})

const Nav = ({ homepage, repository = {} }: Props) =>
  <nav className="nav-link">
    <a href={homepage}>Home</a>
    {links.map(({ key, href, label }) => <a href={href} key={key}>{label}</a>)}
    <a href={repository.url}>Github</a>
    <a href="#" className="more">
      <svg
        aria-hidden="true"
        className="octicon"
        height="24"
        version="1.1"
        viewBox="0 0 12 16"
        width="18"
      >
        <path
          fill-rule="evenodd"
          d="M11.41 9H.59C0 9 0 8.59 0 8c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zm0-4H.59C0 5 0 4.59 0 4c0-.59 0-1 .59-1H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1h.01zM.59 11H11.4c.59 0 .59.41.59 1 0 .59 0 1-.59 1H.59C0 13 0 12.59 0 12c0-.59 0-1 .59-1z"
        />
      </svg>
    </a>
  </nav>

export default Nav
