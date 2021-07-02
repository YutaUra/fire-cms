---
to: packages/components/src/component/<%= h.changeCase.paramCase(name) %>/<%= h.changeCase.paramCase(name) %>.tsx
---
export interface <%= h.changeCase.titleCase(name) %>Props {}

export const <%= h.changeCase.titleCase(name) %> = ({}: <%= h.changeCase.titleCase(name) %>Props): JSX.Element => {}
