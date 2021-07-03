import { toast } from '@fire-cms/toast'
import { Dialog } from '@headlessui/react'
import { useCallback } from 'react'
import { AiFillFolderAdd } from 'react-icons/ai'
import { useCreateFolder } from '../../hooks'
import type { CreateFolderFormField } from '../forms/CreateFolderForm'
import { CreateFolderForm } from '../forms/CreateFolderForm'
import { Modal } from '../molecules/Modal'

interface CreateFolderProps {
  path: string
  reload: () => Promise<void>
}
export const CreateFolder = ({
  path,
  reload,
}: CreateFolderProps): JSX.Element => {
  const createFolder = useCreateFolder()

  const handleSubmit = useCallback(
    async (data: CreateFolderFormField) => {
      try {
        await createFolder(path, data.name)
        await reload()
        toast.success('フォルダーを作成しました')
      } catch {
        toast.error('フォルダーを作成できませんでした')
      }
    },
    [createFolder, path, reload],
  )

  return (
    <Modal
      Activator={useCallback(
        ({ onClick }) => (
          <button
            className="flex justify-center items-center p-1 rounded-md border border-gray-400"
            onClick={onClick}
            type="button"
          >
            <AiFillFolderAdd aria-hidden className="w-7 h-7" />

            <span className="sr-only">フォルダーを作成 </span>
          </button>
        ),
        [],
      )}
    >
      {useCallback(
        ({ onClose }) => (
          <div className="mt-3 sm:mt-5 text-center">
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              フォルダーの作成
            </Dialog.Title>

            <CreateFolderForm
              className="mt-2"
              onClose={onClose}
              onSubmit={handleSubmit}
            />
          </div>
        ),
        [handleSubmit],
      )}
    </Modal>
  )
}
