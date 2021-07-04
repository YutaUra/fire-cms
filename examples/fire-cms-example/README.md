1. `tailwind.config.js`の中の`purge`を`node_modules`を参照するようにする
2. `src/config.ts`の中の Firebase の設定を変更する
3. `pages/_app.tsx`の中を以下のようにする

   ```tsx
   import App from 'next/app'
   import 'react-toastify/dist/ReactToastify.css'
   import 'tailwindcss/tailwind.css'

   export default App
   ```

4. `pages/admin/[[...slug]].tsx`を以下のように変更する

   ```tsx
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
   ```
