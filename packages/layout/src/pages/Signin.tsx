import { useFireCmsAuthUser } from '@fire-cms/auth'
import { useFireCmsRouterPush, useFireCmsRouterQuery } from '@fire-cms/router'
import { useEffect, useMemo } from 'react'
import { Signin } from '../components/pages/Signin'
import { useFireCmsLayoutRedirectTo } from '../context'

export const SigninPage = (): JSX.Element => {
  const user = useFireCmsAuthUser()
  const redirectTo = useFireCmsLayoutRedirectTo()
  const query = useFireCmsRouterQuery()
  const push = useFireCmsRouterPush()

  const next = useMemo(() => {
    if (typeof query.next !== 'undefined') return query.next
    return redirectTo
  }, [query.next, redirectTo])

  useEffect(() => {
    if (user) {
      push(next)
    }
  }, [next, push, user])

  return <Signin />
}
