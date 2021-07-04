import { FireCmsCommonPluginRoot, FireCmsPluginRoot } from '@fire-cms/plugin'
import { AppProps } from 'next/app'
import { useMemo } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import 'tailwindcss/tailwind.css'
import { plugins } from '../config'

const App = ({ Component, pageProps, router }: AppProps) => {
  const { pathname } = router
  const isAdmin = useMemo(() => pathname === '/admin/[[...slug]]', [pathname])
  const fireCmsRootType = useMemo(() => (isAdmin ? 'cms' : 'client'), [isAdmin])
  return (
    <FireCmsCommonPluginRoot plugins={plugins}>
      <FireCmsPluginRoot type={fireCmsRootType}>
        <Component {...pageProps} />
      </FireCmsPluginRoot>
    </FireCmsCommonPluginRoot>
  )
}

export default App
