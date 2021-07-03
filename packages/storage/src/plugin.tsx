import type { FireCmsPlugin } from '@fire-cms/plugin'
import { AiTwotoneFolderOpen } from 'react-icons/ai'
import { StorageIndex } from './pages/index'

export class FireCmsStoragePlugin implements FireCmsPlugin {
  public menus: FireCmsPlugin['menus'] = [
    {
      href: 'storage',
      icon: AiTwotoneFolderOpen,
      name: 'ストレージ',
    },
  ]

  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    const [first, ...path] = slug
    if (first !== 'storage') return undefined
    return {
      Page: (): JSX.Element => <StorageIndex path={path.join('/')} />,
    }
  }
}
