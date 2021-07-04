import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { FirebaseOptions } from 'firebase/app'
import { FirebaseConfigProvider } from './context'

export interface FirebaseConfigPluginOptions {
  firebaseOptions: FirebaseOptions
}

export class FirebaseConfigPlugin implements FireCmsPlugin {
  private readonly firebaseOptions: FirebaseOptions

  public constructor({ firebaseOptions }: FirebaseConfigPluginOptions) {
    this.firebaseOptions = firebaseOptions
  }

  public commonRoot: FireCmsPlugin['commonRoot'] = ({ children }) => (
    <FirebaseConfigProvider option={this.firebaseOptions}>
      {children}
    </FirebaseConfigProvider>
  )
}
