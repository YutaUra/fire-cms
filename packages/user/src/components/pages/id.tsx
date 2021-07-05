import {
  Breadcrumbs,
  BreadcrumbsLink,
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useFireCmsRouterPush } from '@fire-cms/router'
import type { VFC } from 'react'
import { useFireCmsUserPublicProfile } from '../../hooks'

export const UserIdMain: VFC<{ userId: string }> = ({ userId }) => {
  const [profile, isLoading] = useFireCmsUserPublicProfile(userId)
  const push = useFireCmsRouterPush()

  if (isLoading) return null

  if (!profile) {
    push('/')
    return null
  }

  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <Breadcrumbs>
          <BreadcrumbsLink href="/users">ユーザー</BreadcrumbsLink>

          <BreadcrumbsLink href={`/users/${userId}`}>
            {profile.name ?? 'unknown'}
          </BreadcrumbsLink>
        </Breadcrumbs>
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <div className="space-y-4">
          {profile.photo && (
            <div>
              <img
                alt="プロフィール画像"
                className="object-cover w-32 h-32 rounded-full"
                src={profile.photo}
              />
            </div>
          )}

          <h1 className="text-lg">{profile.name ?? 'unknown'}</h1>
        </div>
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
