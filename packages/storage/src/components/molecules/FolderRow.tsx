import { TableTd, TableTr } from '@fire-cms/components'
import { FIRECMS_STORAGE } from '@fire-cms/firebase-storage'
import { useFireCmsRouterLinkComponent } from '@fire-cms/router'
import type { StorageReference } from 'firebase/storage'
import { AiOutlineFolder } from 'react-icons/ai'

interface FolderRowProps {
  prefix: StorageReference
}

export const FolderRow = ({ prefix }: FolderRowProps): JSX.Element => {
  const Link = useFireCmsRouterLinkComponent()
  return (
    <TableTr>
      <TableTd>
        <div className="flex flex-row items-center space-x-2">
          <AiOutlineFolder className="w-6 h-6" />

          <Link
            className="text-indigo-600 hover:text-indigo-900"
            href={`/storage/${prefix.fullPath.replace(
              new RegExp(`^${FIRECMS_STORAGE}/`, 'u'),
              '',
            )}`}
          >
            {prefix.name}
          </Link>
        </div>
      </TableTd>

      <TableTd>-</TableTd>

      <TableTd>フォルダー</TableTd>

      <TableTd />
    </TableTr>
  )
}
