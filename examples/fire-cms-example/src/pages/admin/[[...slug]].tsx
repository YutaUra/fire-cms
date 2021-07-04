import { FireCmsRouter } from '@fire-cms/layout'
import { useSlug } from '@fire-cms/with-nextjs'

const Index = () => {
  const slug = useSlug('slug')
  return <FireCmsRouter slug={slug} />
}
export default Index
