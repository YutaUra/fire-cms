import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { useFireCmsUserMyPublicProfile } from '@fire-cms/user'
import clsx from 'clsx'
import noImage from '../../../assets/user-no-image.png'

interface DashboardNavigationProfileAvatarProps {
  className?: string
}

const DashboardNavigationProfileAvatar = ({
  className,
}: DashboardNavigationProfileAvatarProps): JSX.Element => {
  const profile = useFireCmsUserMyPublicProfile()
  return (
    <div>
      <img
        alt={profile?.name ?? ''}
        className={clsx([className, 'inline-block rounded-full object-cover'])}
        src={profile?.photo ?? noImage}
      />
    </div>
  )
}

interface DashboardNavigationProfileNameProps {
  size: 'desktop' | 'mobile'
}

const DashboardNavigationProfileName = ({
  size,
}: DashboardNavigationProfileNameProps): JSX.Element => {
  const profile = useFireCmsUserMyPublicProfile()
  return (
    <div className="ml-3">
      <p
        className={clsx([
          size === 'mobile' && 'text-base',
          size === 'desktop' && 'text-sm',
          'font-medium text-white',
        ])}
      >
        {profile?.name ?? 'unknown'}
      </p>

      <p
        className={clsx([
          size === 'mobile' && 'text-sm',
          size === 'desktop' && 'text-xs',
          'font-medium text-gray-400 group-hover:text-gray-300',
        ])}
      >
        View profile
      </p>
    </div>
  )
}

interface DashboardNavigationProfileProps {
  size: 'desktop' | 'mobile'
  className?: string
}

export const DashboardNavigationProfile = ({
  size,
  className,
}: DashboardNavigationProfileProps): JSX.Element => {
  const Link = useFireCmsRouterLinkComponent()
  return (
    <div className={clsx([className, 'flex bg-gray-700 p-4'])}>
      <Link
        className={clsx([
          size === 'desktop' && 'w-full',
          'flex-shrink-0 group block',
        ])}
        href="/users/settings"
      >
        <div className="flex items-center">
          <DashboardNavigationProfileAvatar
            className={clsx([
              size === 'desktop' && 'h-9 w-9',
              size === 'mobile' && 'h-10 w-10',
            ])}
          />

          <DashboardNavigationProfileName size={size} />
        </div>
      </Link>
    </div>
  )
}
