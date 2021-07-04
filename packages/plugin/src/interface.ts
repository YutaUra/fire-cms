import type { FC, SVGProps, VFC } from 'react'

export interface FireCmsMenu {
  name: string
  href: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}

export interface FireCmsPage {
  Page: VFC
}

export interface FireCmsPlugin {
  commonRoot?: FC
  cmsRoot?: FC
  clientRoot?: FC
  getPage?: (slug: string[]) => FireCmsPage | undefined
  menus?: FireCmsMenu[]
}
