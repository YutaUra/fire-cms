import clsx from 'clsx'
import type { SVGProps } from 'react'
import { useMemo } from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import join from 'url-join'
import { useFireCmsPlugin } from '../../../../../plugin/dist/types'
import {
  useFireCmsRouterBasePath,
  useFireCmsRouterLinkComponent,
} from '../../../../../router/dist/types'

interface DashboardNavigationLinkProps {
  href: string
  current: boolean
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  name: string
}

const DashboardNavigationLink = ({
  href,
  current,
  icon: Icon,
  name,
}: DashboardNavigationLinkProps): JSX.Element => {
  const basePath = useFireCmsRouterBasePath()
  const hrefWithBasePath = useMemo(() => join(basePath, href), [basePath, href])
  const Link = useFireCmsRouterLinkComponent()

  return (
    <Link
      className={clsx(
        current
          ? 'text-white bg-gray-900'
          : 'text-gray-300 hover:text-white hover:bg-gray-700',
        'group flex items-center py-2 px-2 text-base font-medium rounded-md',
      )}
      href={hrefWithBasePath}
    >
      <Icon
        aria-hidden="true"
        className={clsx(
          current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300',
          'flex-shrink-0 mr-4 w-6 h-6',
        )}
      />

      {name}
    </Link>
  )
}

interface Navigation {
  name: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  current: boolean
}

interface DashboardNavigationLinkListProps {
  className?: string
}

export const DashboardNavigationLinkList = ({
  className,
}: DashboardNavigationLinkListProps): JSX.Element => {
  const plugins = useFireCmsPlugin()

  const navigation = useMemo<Navigation[]>(
    () => [
      { current: true, href: '#', icon: HiOutlineHome, name: 'Dashboard' },
      ...plugins
        .map((plugin) => plugin.menus)
        .filter(
          (menus): menus is Exclude<typeof menus, undefined> =>
            typeof menus !== 'undefined',
        )
        .flatMap((menus) => menus)
        .map((menu) => ({ ...menu, current: false })),
    ],
    [plugins],
  )
  return (
    <nav className={clsx([className, 'px-2 mt-5 space-y-1'])}>
      {navigation.map((item) => (
        <DashboardNavigationLink key={item.name} {...item} />
      ))}
    </nav>
  )
}
