import { FireCmsAuthPlugin } from '@fire-cms/auth'
import { FireCmsBlogPlugin } from '@fire-cms/blog'
import { FirebaseConfigPlugin } from '@fire-cms/firebase-config'
import { FireCmsLayoutPlugin } from '@fire-cms/layout'
import { FireCmsPermissionPlugin } from '@fire-cms/permission'
import { FireCmsPlugin } from '@fire-cms/plugin'
import { FireCmsRouterPlugin } from '@fire-cms/router'
import { FireCmsStoragePlugin } from '@fire-cms/storage'
import { FireCmsToastPlugin } from '@fire-cms/toast'
import { FireCmsUserPlugin } from '@fire-cms/user'
import { FireCmsUserProfilePlugin } from '@fire-cms/user-profile'
import { LinkComponent, useNextRouter } from '@fire-cms/with-nextjs'

export const plugins: FireCmsPlugin[] = [
  new FirebaseConfigPlugin({
    firebaseOptions: {
      apiKey: 'AIzaSyDaXjVWKFP2mfrwaK4w1XukzJ2ZV4chSYo',
      authDomain: 'fire-cms-example.firebaseapp.com',
      projectId: 'fire-cms-example',
      storageBucket: 'fire-cms-example.appspot.com',
      messagingSenderId: '93808196642',
      appId: '1:93808196642:web:39a997f81520dbddbf9e7b',
      measurementId: 'G-R43DT8NQDR',
    },
  }),
  new FireCmsAuthPlugin(),
  new FireCmsRouterPlugin({
    useRouter: useNextRouter,
    basePath: '/admin',
    LinkComponent,
  }),
  new FireCmsLayoutPlugin({ redirectTo: '/' }),
  new FireCmsToastPlugin(),
  new FireCmsPermissionPlugin({}),
  new FireCmsStoragePlugin(),
  new FireCmsBlogPlugin(),
  new FireCmsUserPlugin(),
  new FireCmsUserProfilePlugin(),
]
