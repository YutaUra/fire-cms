import {
  Table,
  TableTbody,
  TableTh,
  TableThead,
  TableTr,
} from '@fire-cms/components'
import type { StorageReference } from 'firebase/storage'
import { FileRow } from '../molecules/FileRow'
import { FolderRow } from '../molecules/FolderRow'

interface FileTableProps {
  path: string
  items: StorageReference[]
  prefixes: StorageReference[]
  reload: () => Promise<void>
}

export const FileTable = ({
  path,
  items,
  prefixes,
  reload,
}: FileTableProps): JSX.Element => (
  <Table>
    <TableThead>
      <TableTr>
        <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
          名前
        </TableTh>

        <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
          サイズ
        </TableTh>

        <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
          Type
        </TableTh>

        <TableTh className="text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
          最終変更日
        </TableTh>
      </TableTr>
    </TableThead>

    <TableTbody>
      {prefixes.map((prefix) => (
        <FolderRow key={prefix.fullPath} prefix={prefix} />
      ))}

      {items.map((item) => (
        <FileRow item={item} key={item.fullPath} path={path} reload={reload} />
      ))}
    </TableTbody>
  </Table>
)
