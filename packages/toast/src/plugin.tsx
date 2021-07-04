import type { FireCmsPlugin } from '@fire-cms/plugin'
import { ToastContainer } from 'react-toastify'

export class FireCmsToastPlugin implements FireCmsPlugin {
  public cmsRoot: FireCmsPlugin['cmsRoot'] = ({ children }) => (
    <>
      <ToastContainer />

      {children}
    </>
  )
}
