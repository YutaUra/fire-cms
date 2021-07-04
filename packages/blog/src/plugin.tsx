import type { FireCmsPlugin } from '@fire-cms/plugin'
import { RiArticleLine } from 'react-icons/ri'
import { FireCmsBlogProvider } from './context'
import { BlogIndex } from './pages'
import { BlogAdd } from './pages/add'
import { BlogEdit } from './pages/edit'

export class FireCmsBlogPlugin implements FireCmsPlugin {
  public menus: FireCmsPlugin['menus'] = [
    {
      href: 'blogs',
      icon: RiArticleLine,
      name: 'ブログ',
    },
  ]

  public getPage: FireCmsPlugin['getPage'] = (slug) => {
    const [first, ...others] = slug
    if (first !== 'blogs') return undefined

    if (others.length === 0) {
      return {
        Page: BlogIndex,
      }
    }
    if (others.length === 1 && others[0] === 'add') {
      return {
        Page: BlogAdd,
      }
    }
    if (others.length === 1 && typeof others[0] === 'string') {
      return {
        Page: (): JSX.Element => <BlogEdit blogId={others[0] ?? ''} />,
      }
    }
    return undefined
  }

  public cmsRoot: FireCmsPlugin['cmsRoot'] = ({ children }) => (
    <FireCmsBlogProvider>{children}</FireCmsBlogProvider>
  )
}
