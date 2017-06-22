// @flow

type RepositoryType = 'git' | 'svn'

type Repository =
  | string
  | {
      type: RepositoryType,
      url: string
    }

const isShortcut = (url: string): string => {
  let repo: ?RegExpMatchArray | ?Array<string>
  const re = /(gist|bitbucket|gitlab):([\w]+)+(\/[\w]+)*/
  repo = url.match(re)

  if (!repo) {
    return `https://github.com/${url}`
  } else {
    switch (repo[1]) {
      case 'bitbucket':
        return `https://bitbucket.org/${repo[2]}${repo[3]}`
      case 'gitlab':
        return `https://gitlab.com/${repo[2]}${repo[3]}`
      default:
        return `https://gist.github.com/${repo[2]}`
    }
  }
}

const isObject = (obj: { type: RepositoryType, url: string }): string => {
  let repo: ?RegExpMatchArray | ?Array<string>
  const re: RegExp = /((git|ssh|http(s)?)|(git@[\w\.]+))(:(\/\/)?)([\w\.@\:/\-~]+)(\.git)(\/)?/

  repo = obj.url.match(re)

  if (!repo) {
    return ''
  } else {
    return `https://${repo[7]}`
  }
}

export default (repo: Repository) => {
  // let url = typeof repo === 'object' ? repo.url : repo
  // let _repo: ?RegExpMatchArray | ?Array<string>

  // if (typeof repo === 'object') {
  //   url = repo.url
  // }
  if (typeof repo === 'string') {
    return isShortcut(repo)
  } else {
    return isObject(repo)
    // _repo = repo.url.match(re)
  }
}
