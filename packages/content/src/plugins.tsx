import type { FireCmsPlugin } from '@fire-cms/plugin'
import { VscSymbolClass } from 'react-icons/vsc'
import { FireCmsContentCmsProvider, FireCmsContentCommonRoot } from './context'
import { ContentAdd } from './pages/add'
import { ContentIndex } from './pages/index'
import { ContentId } from './pages/[content-id]'
import { ContentIdAdd } from './pages/[content-id]-add'
import { ContentIdEdit } from './pages/[content-id]-edit'
import { ContentIdEntryId } from './pages/[content-id]-[entry-id]'

export class FireCmsContentsPlugin implements FireCmsPlugin {
  public menus: FireCmsPlugin['menus'] = [
    {
      href: 'contents',
      icon: VscSymbolClass,
      name: 'コンテンツ',
    },
  ]

  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    const [first, ...others] = slug
    if (first !== 'contents') return undefined
    if (others.length === 0)
      return {
        Page: ContentIndex,
      }
    if (others.length === 1 && others[0] === 'add') {
      return {
        Page: ContentAdd,
      }
    }
    const [contentId = '', ...others2] = others
    if (others2.length === 0) {
      return {
        Page: (): JSX.Element => <ContentId contentId={contentId} />,
      }
    }
    if (others2.length === 1 && others2[0] === 'edit') {
      return {
        Page: (): JSX.Element => <ContentIdEdit contentId={contentId} />,
      }
    }
    if (others2.length === 1 && others2[0] === 'add') {
      return {
        Page: (): JSX.Element => <ContentIdAdd contentId={contentId} />,
      }
    }
    const [entryId = '', ...others3] = others2
    if (others3.length === 0) {
      return {
        Page: (): JSX.Element => (
          <ContentIdEntryId contentId={contentId} entryId={entryId} />
        ),
      }
    }

    return undefined
  }

  public commonRoot: FireCmsPlugin['commonRoot'] = ({ children }) => (
    <FireCmsContentCommonRoot>{children}</FireCmsContentCommonRoot>
  )

  public cmsRoot: FireCmsPlugin['cmsRoot'] = ({ children }) => (
    <FireCmsContentCmsProvider>{children}</FireCmsContentCmsProvider>
  )
}
