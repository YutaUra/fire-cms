import { TableTd, TableTr } from '@fire-cms/components'
import { useDisclosure } from '@fire-cms/react-utils'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import { format } from 'date-fns'
import filesize from 'filesize'
import type { FullMetadata, StorageReference } from 'firebase/storage'
import { getMetadata } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { AiOutlineFile, AiOutlineFileImage } from 'react-icons/ai'
import { FileDetail } from '../organizations/FileDetail'

interface FileRowProps {
  item: StorageReference
  path: string
  reload: () => Promise<void>
}

export const FileRow = ({ item, path, reload }: FileRowProps): JSX.Element => {
  const [data, setData] = useState<FullMetadata>()
  const [open, setOpen] = useState(false)
  const { onFalse, onTrue } = useDisclosure(setOpen)
  const Link = useFireCmsRouterLinkComponent()

  useEffect(() => {
    void getMetadata(item).then(setData)
  }, [item, item.fullPath])

  if (!data) {
    return (
      <TableTr>
        <TableTd>
          <div className="flex flex-row items-center space-x-2">
            <AiOutlineFile className="w-6 h-6" />

            <Link
              className="text-indigo-600 hover:text-indigo-900"
              href={`/storage/${path}`}
            >
              {item.name}
            </Link>
          </div>
        </TableTd>

        <TableTd />

        <TableTd />

        <TableTd />
      </TableTr>
    )
  }
  const Icon = data.contentType?.startsWith('image')
    ? AiOutlineFileImage
    : AiOutlineFile
  return (
    <TableTr>
      <FileDetail file={data} onClose={onFalse} open={open} reload={reload} />

      <TableTd>
        <button
          className="flex flex-row items-center space-x-2"
          onClick={onTrue}
          type="button"
        >
          <Icon className="w-6 h-6" />

          <span className="text-indigo-600 hover:text-indigo-900">
            {item.name}
          </span>
        </button>
      </TableTd>

      <TableTd>{filesize(data.size)}</TableTd>

      <TableTd>{data.contentType}</TableTd>

      <TableTd>{format(new Date(data.updated), 'yyyy/MM/dd')}</TableTd>
    </TableTr>
  )
}
