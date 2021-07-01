import type { ReactNode } from 'react'

export interface FireCmsPlugin {
  root?: (props: { children: ReactNode }) => JSX.Element
  pages?: Record<string, () => JSX.Element>
}
