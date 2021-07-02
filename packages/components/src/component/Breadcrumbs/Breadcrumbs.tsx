import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import type { ReactNode } from 'react'
import { HiHome } from 'react-icons/hi'

interface BreadcrumbsLinkProps {
  href: string
  children: ReactNode
}

export const BreadcrumbsLink = ({
  href,
  children,
}: BreadcrumbsLinkProps): JSX.Element => {
  const Link = useFireCmsRouterLinkComponent()
  return (
    <li className="flex">
      <div className="flex items-center">
        <svg
          aria-hidden="true"
          className="flex-shrink-0 w-6 h-full text-gray-200"
          fill="currentColor"
          preserveAspectRatio="none"
          viewBox="0 0 24 44"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
        </svg>

        <Link
          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          href={href}
        >
          {children}
        </Link>
      </div>
    </li>
  )
}

interface BreadcrumbsProps {
  children?: ReactNode
}
/**
 *
 * ```tsx
 * const Sample = () => (
 *   <Breadcrumbs>
 *     <BreadcrumbsLink href="#">
 *       Project
 *     </BreadcrumbsLink>
 *     <BreadcrumbsLink href="#">
 *       Hello World
 *     </BreadcrumbsLink>
 *   </Breadcrumbs>
 * )
 * ```
 */
export const Breadcrumbs = ({ children }: BreadcrumbsProps): JSX.Element => {
  const Link = useFireCmsRouterLinkComponent()

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex bg-white border-b border-gray-200"
    >
      <ol className="flex px-4 sm:px-6 lg:px-8 mx-auto space-x-4 w-full max-w-screen-xl">
        <li className="flex">
          <div className="flex items-center">
            <Link className="text-gray-400 hover:text-gray-500" href="/">
              <span className="sr-only">Home</span>

              <HiHome aria-hidden="true" className="flex-shrink-0 w-5 h-5" />
            </Link>
          </div>
        </li>

        {children}
      </ol>
    </nav>
  )
}
