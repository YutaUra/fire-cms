import { useDisclosure } from '@fire-cms/react-utils'
import { Dialog, Transition } from '@headlessui/react'
import type { ReactNode } from 'react'
import { Fragment, useState } from 'react'

interface ModalDialogProps {
  children?: ReactNode
}

const ModalDialog = ({ children }: ModalDialogProps): JSX.Element => (
  <div className="flex sm:block justify-center items-end sm:p-0 px-4 pt-4 pb-20 min-h-screen text-center">
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    </Transition.Child>

    <span
      aria-hidden="true"
      className="hidden sm:inline-block sm:h-screen sm:align-middle"
    >
      &#8203;
    </span>

    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      enterTo="opacity-100 translate-y-0 sm:scale-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    >
      <div className="inline-block overflow-hidden sm:p-6 px-4 pt-5 pb-4 sm:my-8 sm:w-full sm:max-w-lg text-left align-bottom sm:align-middle bg-white rounded-lg shadow-xl transition-all transform">
        {children}
      </div>
    </Transition.Child>
  </div>
)

interface ModalProps {
  Activator: (props: { onClick: () => void }) => JSX.Element
  children: (props: {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
  }) => JSX.Element
}
export const Modal = ({
  Activator,
  children: Children,
}: ModalProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)
  const { onTrue, onFalse } = useDisclosure(setIsOpen)

  return (
    <>
      <Activator onClick={onTrue} />

      <Transition.Root as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className="overflow-y-auto fixed inset-0 z-10"
          onClose={onFalse}
          open={isOpen}
          static
        >
          <ModalDialog>
            <Children isOpen={isOpen} onClose={onFalse} onOpen={onTrue} />
          </ModalDialog>
        </Dialog>
      </Transition.Root>
    </>
  )
}
