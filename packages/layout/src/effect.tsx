import { useFireCmsAuthIsReady, useFireCmsAuthUser } from '@fire-cms/auth'
import {
  useFireCmsRouterBasePath,
  useFireCmsRouterPush,
} from '@fire-cms/router'
import type { ReactNode } from 'react'

const removeBasePath = (base: string, path: string): string => {
  const basePath = base.startsWith('/') ? base : `/${base}`
  const pathname = path.startsWith(basePath)
    ? path.slice(basePath.length)
    : path
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

interface FireCmsLoginRequiredEffectProps {
  children: ReactNode
}

export const FireCmsLoginRequired = ({
  children,
}: FireCmsLoginRequiredEffectProps): JSX.Element | null => {
  const authIsReady = useFireCmsAuthIsReady()
  const basePath = useFireCmsRouterBasePath()
  const user = useFireCmsAuthUser()
  const push = useFireCmsRouterPush()

  if (!authIsReady) return null
  if (!user) {
    push(`signin?next=${removeBasePath(basePath, window.location.pathname)}`)
    return null
  }

  return <> {children}</>
}
