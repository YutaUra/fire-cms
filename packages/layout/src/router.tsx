import { useFireCmsPlugin } from '@fire-cms/plugin'
import { useFireCmsLayoutNotFoundComponent } from './context'

interface FireCmsRouterProps {
  slug: string[]
}

export const FireCmsRouter = ({ slug }: FireCmsRouterProps): JSX.Element => {
  const plugins = useFireCmsPlugin()
  const NotFound = useFireCmsLayoutNotFoundComponent()

  for (const plugin of plugins) {
    if (plugin.getPage) {
      const pageInfo = plugin.getPage(slug)
      if (pageInfo) {
        const { Page } = pageInfo
        return <Page />
      }
    }
  }
  return <NotFound />
}
