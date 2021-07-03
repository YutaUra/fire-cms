import { Breadcrumbs, BreadcrumbsLink } from '@fire-cms/components'
import { useMemo } from 'react'

const Prev = 2
const Post = 2

const getPaths = function* getPaths(path: string): Generator<
  {
    href: string
    name: string
  },
  void
> {
  const dirs = path.split('/')
  let href = '/storage'
  yield { href, name: 'ストレージ' }
  for (const [idx, dir] of dirs.entries()) {
    if (idx === dirs.length - Post && idx > Prev) {
      yield {
        href: `/storage/${path}#`,
        name: '...',
      }
    }
    href += `/${dir}`
    if (idx < Prev || idx > dirs.length - Post - 1) {
      yield { href, name: dir }
    }
  }
}

interface PathBreadcrumbsProps {
  path: string
}

export const PathBreadcrumbs = ({
  path,
}: PathBreadcrumbsProps): JSX.Element => {
  const dirs = useMemo(() => [...getPaths(path)], [path])
  return (
    <Breadcrumbs>
      {dirs.map(({ href, name }) => (
        <BreadcrumbsLink href={href} key={href}>
          {name}
        </BreadcrumbsLink>
      ))}
    </Breadcrumbs>
  )
}
