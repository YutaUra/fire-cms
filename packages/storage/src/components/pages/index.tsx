import {
  DashboardBodyContent,
  DashboardBodyMain,
  DashboardBodyTitle,
} from '@fire-cms/components'
import { useStorageFiles } from '../../hooks'
import { PathBreadcrumbs } from '../molecules/PathBreadcrumbs'
import { CreateFile } from '../organizations/CreateFile'
import { CreateFolder } from '../organizations/CreateFolder'
import { FileTable } from '../organizations/FileTable'

interface StorageIndexMainProps {
  path: string
}

export const StorageIndexMain = ({
  path,
}: StorageIndexMainProps): JSX.Element => {
  const { items, prefixes, reload, isLoading } = useStorageFiles(path)
  return (
    <DashboardBodyMain>
      <DashboardBodyTitle>
        <PathBreadcrumbs path={path} />
      </DashboardBodyTitle>

      <DashboardBodyContent>
        <div className="flex justify-end mb-4 space-x-3">
          <CreateFolder path={path} reload={reload} />

          <CreateFile path={path} reload={reload} />
        </div>

        {isLoading ? (
          'loading...'
        ) : prefixes.length === 0 && items.length === 0 ? (
          <div className="flex justify-center items-center">
            <div className="w-10/12 max-w-sm h-28">
              アイテムはありませんでした。
            </div>
          </div>
        ) : (
          <FileTable
            items={items}
            path={path}
            prefixes={prefixes}
            reload={reload}
          />
        )}
      </DashboardBodyContent>
    </DashboardBodyMain>
  )
}
