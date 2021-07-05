import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { toast } from '@fire-cms/toast'
import { useFireCmsUserPublicProfile } from '@fire-cms/user'
import { Dialog, Transition } from '@headlessui/react'
import { format } from 'date-fns'
import filesize from 'filesize'
import type { FullMetadata } from 'firebase/storage'
import { deleteObject } from 'firebase/storage'
import type { MouseEventHandler, ReactNode } from 'react'
import { Fragment, useCallback, useMemo } from 'react'
import { HiX } from 'react-icons/hi'
import { MdOpenInNew } from 'react-icons/md'
import { useFileDownloadUrl } from '../../hooks'

interface FileDetailModalProps {
  open: boolean
  onClose: () => void
  children?: ReactNode
}

const FileDetailModal = ({
  children,
  open,
  onClose,
}: FileDetailModalProps): JSX.Element => (
  <Transition.Root as={Fragment} show={open}>
    <Dialog
      as="div"
      className="overflow-hidden fixed inset-0"
      onClose={onClose}
      open={open}
      static
    >
      <div className="overflow-hidden absolute inset-0">
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="flex fixed inset-y-0 right-0 pl-10 max-w-full">
          <Transition.Child
            as={Fragment}
            enter="transform transition ease-in-out duration-500 sm:duration-700"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transform transition ease-in-out duration-500 sm:duration-700"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="relative w-96">{children}</div>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition.Root>
)

interface FileDetailInfomationProps {
  file: FullMetadata
  downloadUrl: string
}

const FileDetailInfomation = ({
  file,
  downloadUrl,
}: FileDetailInfomationProps): JSX.Element => {
  const uploadedBy = useMemo(() => file.customMetadata?.uploadedBy, [file])
  const [profile] = useFireCmsUserPublicProfile(uploadedBy ?? '')
  const Link = useFireCmsRouterLinkComponent()

  return (
    <>
      <div>
        {file.contentType?.startsWith('image/') && (
          // @tailwindcss/aspect にて補充される
          // eslint-disable-next-line tailwindcss/no-custom-classname
          <div className="block overflow-hidden w-full rounded-lg aspect-w-10 aspect-h-7">
            <img alt="" className="object-cover" src={downloadUrl} />
          </div>
        )}

        <div className="flex justify-between items-start mt-4">
          <div>
            <h2 className="text-lg font-medium text-gray-900">
              <span className="sr-only">Details for </span>

              <span>{file.name}</span>
            </h2>

            <p className="text-sm font-medium text-gray-500">
              {filesize(file.size)}
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium text-gray-900">Information</h3>

        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Uploaded by</dt>

            <dd className="text-gray-900">
              {uploadedBy ? (
                <Link href={`/users/${uploadedBy}`}>
                  {profile?.name ?? 'unknown'}
                </Link>
              ) : (
                'unknown'
              )}
            </dd>
          </div>

          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Created</dt>

            <dd className="text-gray-900">
              {format(new Date(file.timeCreated), 'yyyy-MM-dd')}
            </dd>
          </div>

          <div className="flex justify-between py-3 text-sm font-medium">
            <dt className="text-gray-500">Last modified</dt>

            <dd className="text-gray-900">
              {format(new Date(file.updated), 'yyyy-MM-dd')}
            </dd>
          </div>
        </dl>
      </div>
    </>
  )
}

interface FileDetailProps {
  open: boolean
  onClose: () => void
  file: FullMetadata
  reload: () => Promise<void>
}

export const FileDetail = ({
  onClose,
  open,
  file,
  reload,
}: FileDetailProps): JSX.Element => {
  const downloadUrl = useFileDownloadUrl(file.fullPath)
  const handleClickCopyButton = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(
    async (event) => {
      event.preventDefault()
      await navigator.clipboard.writeText(downloadUrl)
      toast.success('URLをコピーしました。')
    },
    [downloadUrl],
  )
  const handleDeleteButton = useCallback(async () => {
    if (!file.ref) return
    try {
      await deleteObject(file.ref)
      await reload()
      toast.success('ファイルを削除しました')
    } catch {
      toast.error('ファイルを削除できませんでした。')
    }
  }, [file.ref, reload])
  return (
    <FileDetailModal onClose={onClose} open={open}>
      <Transition.Child
        as={Fragment}
        enter="ease-in-out duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in-out duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex absolute top-0 left-0 pt-4 pr-2 sm:pr-4 -ml-8 sm:-ml-10">
          <button
            className="text-gray-300 hover:text-white rounded-md focus:ring-2 focus:ring-white focus:outline-none"
            onClick={onClose}
            type="button"
          >
            <span className="sr-only">Close panel</span>

            <HiX aria-hidden="true" className="w-6 h-6" />
          </button>
        </div>
      </Transition.Child>

      <div className="overflow-y-auto p-8 h-full bg-white">
        <div className="pb-16 space-y-6">
          <FileDetailInfomation downloadUrl={downloadUrl} file={file} />

          <div className="flex">
            <button
              className="flex-1 py-2 px-4 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-md border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              onClick={handleClickCopyButton}
              type="button"
            >
              Copy Link
            </button>
          </div>

          <div className="flex">
            <a
              className="flex flex-1 justify-center items-center py-2 px-4 space-x-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md border border-transparent focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              href={downloadUrl}
              rel="noreferrer noopener"
              target="_blank"
            >
              <MdOpenInNew aria-hidden />

              <span>Open</span>
            </a>

            <button
              className="flex-1 py-2 px-4 ml-3 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md border border-red-300 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 shadow-sm focus:outline-none"
              onClick={handleDeleteButton}
              type="button"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </FileDetailModal>
  )
}
