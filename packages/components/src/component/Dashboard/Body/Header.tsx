import clsx from 'clsx'
import { HiOutlineMenu } from 'react-icons/hi'
import { useDashboardSetIsOpen } from '../context'

interface DashboardBodyHeaderProps {
  className?: string
}

export const DashboardBodyHeader = ({
  className,
}: DashboardBodyHeaderProps): JSX.Element => {
  const { onOpen } = useDashboardSetIsOpen()
  return (
    <div className={clsx([className, 'pl-1 pt-1 sm:pl-3 sm:pt-3 md:hidden'])}>
      <button
        className="inline-flex justify-center items-center -mt-0.5 -ml-0.5 w-12 h-12 text-gray-500 hover:text-gray-900 rounded-md focus:ring-2 focus:ring-inset focus:ring-indigo-500 focus:outline-none"
        onClick={onOpen}
        type="button"
      >
        <span className="sr-only">Open sidebar</span>

        <HiOutlineMenu aria-hidden="true" className="w-6 h-6" />
      </button>
    </div>
  )
}
