import type { FireCmsPlugin } from '@fire-cms/plugin'
import type { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export class FireCmsToastPlugin implements FireCmsPlugin {
  public root = ({ children }: { children: ReactNode }): JSX.Element => (
    <>
      <ToastContainer />

      {children}
    </>
  )
}
