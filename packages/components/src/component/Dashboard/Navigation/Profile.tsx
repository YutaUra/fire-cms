import clsx from 'clsx'

interface DashboardNavigationProfileAvatarProps {
  className?: string
  src?: string
  alt?: string
}

const DashboardNavigationProfileAvatar = ({
  alt,
  className,
  src,
}: DashboardNavigationProfileAvatarProps): JSX.Element => (
  <div>
    <img
      alt={alt}
      className={clsx([className, 'inline-block rounded-full'])}
      src={src}
    />
  </div>
)

interface DashboardNavigationProfileNameProps {
  size: 'desktop' | 'mobile'
  username: string
}

const DashboardNavigationProfileName = ({
  size,
  username,
}: DashboardNavigationProfileNameProps): JSX.Element => (
  <div className="ml-3">
    <p
      className={clsx([
        size === 'mobile' && 'text-base',
        size === 'desktop' && 'text-sm',
        'font-medium text-white',
      ])}
    >
      {username}
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

interface DashboardNavigationProfileProps {
  size: 'desktop' | 'mobile'
  href: string
  username: string
  src: string
  className?: string
}

export const DashboardNavigationProfile = ({
  href,
  size,
  username,
  src,
  className,
}: DashboardNavigationProfileProps): JSX.Element => (
  <div className={clsx([className, 'flex bg-gray-700 p-4'])}>
    <a
      className={clsx([
        size === 'desktop' && 'w-full',
        'flex-shrink-0 group block',
      ])}
      href={href}
    >
      <div className="flex items-center">
        <DashboardNavigationProfileAvatar
          alt={username}
          className={clsx([
            size === 'desktop' && 'h-9 w-9',
            size === 'mobile' && 'h-10 w-10',
          ])}
          src={src}
        />

        <DashboardNavigationProfileName size={size} username={username} />
      </div>
    </a>
  </div>
)
