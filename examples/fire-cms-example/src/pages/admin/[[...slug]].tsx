import { FireCmsRouter } from '@fire-cms/layout'
import { PluginRoot } from '@fire-cms/plugin'
import { useSlug } from '@fire-cms/with-nextjs'
import { plugins } from '../../config'

const Index = () => {
  const slug = useSlug('slug')

  return <FireCmsRouter slug={slug} />
}

const IndexEntry = () => {
  return (
    <PluginRoot plugins={plugins}>
      <Index />
    </PluginRoot>
  )
}
export default IndexEntry
