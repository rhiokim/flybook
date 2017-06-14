// @flow
module.exports = (slugs: string) => {
  slugs = slugs.replace(/_/g, '-')
  slugs = slugs.replace(/--/g, '-')

  var list: string[] = []
  slugs.split('-').forEach((slug: string) => {
    list.push(slug.substr(0, 1).toUpperCase() + slug.substr(1))
  })

  return list.join(' ')
}
