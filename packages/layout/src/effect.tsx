import { useFireCmsAuthIsReady, useFireCmsAuthUser } from '@fire-cms/auth'
import { useFireCmsRouterPush } from '@fire-cms/router'
import type { ReactNode } from 'react'

interface FireCmsLoginRequiredEffectProps {
  children: ReactNode
  base: string
}

export const FireCmsLoginRequiredEffect = ({
  children,
  base,
}: FireCmsLoginRequiredEffectProps): JSX.Element | null => {
  const authIsReady = useFireCmsAuthIsReady()
  const user = useFireCmsAuthUser()
  const push = useFireCmsRouterPush()

  if (!authIsReady) return null
  if (!user) {
    push(`${base}/signin?next=${window.location.pathname}`)
    return null
  }

  return <> {children}</>
}
