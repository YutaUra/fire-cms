import type { FirebaseOptions } from 'firebase/app'
import type { ReactNode } from 'react'
import { FirebaseConfigProvider } from './context'

/*
 * Export const FirebaseConfigPlugin = {
 *   root: FirebaseConfigProvider,
 * }
 */

export interface FirebaseConfigPluginOptions {
  firebaseOptions: FirebaseOptions
}

export class FirebaseConfigPlugin {
  private readonly firebaseOptions: FirebaseOptions

  public constructor({ firebaseOptions }: FirebaseConfigPluginOptions) {
    this.firebaseOptions = firebaseOptions
  }

  public root = ({ children }: { children?: ReactNode }): JSX.Element => (
    <FirebaseConfigProvider option={this.firebaseOptions}>
      {children}
    </FirebaseConfigProvider>
  )
}
