import type { ReactNode } from 'react'

export interface FireCmsPlugin {
  root?: (props: { children: ReactNode }) => JSX.Element
  getPage?: (slug: string[]) =>
    | {
        Page: () => JSX.Element
        allowNonStaff?: boolean
        allowAnonymous?: boolean
      }
    | undefined
}
