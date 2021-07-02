import clsx from 'clsx'

interface DashboardNavigationLogoProps {
  className?: string
  src?: string
  alt?: string
}

export const DashboardNavigationLogo = ({
  className,
  src,
  alt,
}: DashboardNavigationLogoProps): JSX.Element => (
  <div className={clsx([className, 'flex items-center px-4'])}>
    <img alt={alt} className="w-auto h-8" src={src} />
  </div>
)
