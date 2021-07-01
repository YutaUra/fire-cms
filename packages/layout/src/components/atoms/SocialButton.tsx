import type { ReactNode } from 'react'

interface SocialButtonProps {
  onClick?: () => void
  children?: ReactNode
}

export const SocialButton = ({
  onClick,
  children,
}: SocialButtonProps): JSX.Element => (
  <div>
    <button
      className="inline-flex justify-center py-2 px-4 w-full text-sm font-medium text-gray-500 bg-white hover:bg-gray-50 rounded-md border border-gray-300 shadow-sm"
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  </div>
)
