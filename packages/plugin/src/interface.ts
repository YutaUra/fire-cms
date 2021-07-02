import type { ReactNode, SVGProps } from 'react'

export interface FireCmsMenu {
  name: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export interface FireCmsPlugin {
  root?: (props: { children: ReactNode }) => JSX.Element
  getPage?: (slug: string[]) =>
    | {
        Page: () => JSX.Element
      }
    | undefined
  menus?: FireCmsMenu[]
}
