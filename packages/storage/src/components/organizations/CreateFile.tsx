import { toast } from '@fire-cms/toast'
import { Dialog } from '@headlessui/react'
import { uploadBytes } from 'firebase/storage'
import { useCallback } from 'react'
import { AiFillFileAdd } from 'react-icons/ai'
import { useCreateStorageRef } from '../../hooks'
import type { CreateFileFormField } from '../forms/CreateFileForm'
import { CreateFileForm } from '../forms/CreateFileForm'
import { Modal } from '../molecules/Modal'

interface CreateFileProps {
  path: string
  reload: () => Promise<void>
}

export const CreateFile = ({ path, reload }: CreateFileProps): JSX.Element => {
  const createRef = useCreateStorageRef()

  const handleSubmit = useCallback(
    (onClose: () => void) =>
      async (data: CreateFileFormField): Promise<void> => {
        const file = data.files?.item(0)
        if (!file) return

        try {
          await uploadBytes(createRef(`${path}/${file.name}`), file)
          await reload()
          onClose()
          toast.success('ファイルをアップロードしました。')
        } catch {
          toast.error('ファイルをアップロードできませんでした。')
        }
      },
    [createRef, path, reload],
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
            <AiFillFileAdd aria-hidden className="w-7 h-7" />

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

            <CreateFileForm
              className="mt-2"
              onClose={onClose}
              onSubmit={handleSubmit(onClose)}
            />
          </div>
        ),
        [handleSubmit],
      )}
    </Modal>
  )
}
