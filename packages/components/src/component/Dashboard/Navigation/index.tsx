import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment } from 'react'
import { HiX } from 'react-icons/hi'
import { useDashboardIsOpenValue, useDashboardSetIsOpen } from '../context'
import { DashboardNavigationLinkList } from './Link'
import { DashboardNavigationLogo } from './Logo'
import { DashboardNavigationProfile } from './Profile'

const NavigationMobileCloseButton = (): JSX.Element => {
  const { onClose } = useDashboardSetIsOpen()
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-in-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in-out duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute top-0 right-0 pt-2 -mr-12">
        <button
          className="flex justify-center items-center ml-1 w-10 h-10 rounded-full focus:ring-2 focus:ring-inset focus:ring-white focus:outline-none"
          onClick={onClose}
          type="button"
        >
          <span className="sr-only">Close sidebar</span>

          <HiX aria-hidden="true" className="w-6 h-6 text-white" />
        </button>
      </div>
    </Transition.Child>
  )
}

export const DashboardNavigationMobile = (): JSX.Element => {
  const isOpen = useDashboardIsOpenValue()
  const { onClose } = useDashboardSetIsOpen()
  return (
    <Transition.Root as={Fragment} show={isOpen}>
      <Dialog
        as="div"
        className="flex md:hidden fixed inset-0 z-40"
        onClose={onClose}
        open={isOpen}
        static
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="flex relative flex-col flex-1 w-full max-w-xs bg-gray-800">
            <NavigationMobileCloseButton />

            <div className="overflow-y-auto flex-1 pt-5 pb-4 h-0">
              <DashboardNavigationLogo
                alt="Workflow"
                className="flex-shrink-0"
                src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
              />

              <DashboardNavigationLinkList />
            </div>

            <DashboardNavigationProfile
              className="flex-shrink-0"
              href="#"
              size="mobile"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              username="Tom Cook"
            />
          </div>
        </Transition.Child>

        <div className="flex-shrink-0 w-14">
          {/* Force sidebar to shrink to fit close icon */}
        </div>
      </Dialog>
    </Transition.Root>
  )
}

interface DashboardNavigationDesktopProps {
  className?: string
}

export const DashboardNavigationDesktop = ({
  className,
}: DashboardNavigationDesktopProps): JSX.Element => (
  <div className={clsx([className])}>
    <div className="flex flex-col w-64">
      {/* Sidebar component, swap this element with another sidebar if you like */}

      <div className="flex flex-col flex-1 h-0 bg-gray-800">
        <div className="flex overflow-y-auto flex-col flex-1 pt-5 pb-4">
          <DashboardNavigationLogo
            alt="Workflow"
            className="flex-shrink-0"
            src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
          />

          <DashboardNavigationLinkList className="flex-1 bg-gray-800" />
        </div>

        <DashboardNavigationProfile
          className="flex-shrink-0"
          href="#"
          size="desktop"
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          username="Tom Cook"
        />
      </div>
    </div>
  </div>
)
