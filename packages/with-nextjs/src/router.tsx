import type { LinkComponentType } from '@fire-cms/router'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export const useNextRouter = (): {
  push: (url: string) => Promise<boolean>
  query: Record<string, string>
  replace: (url: string) => Promise<boolean>
} => {
  const {
    push: nextPush,
    replace: nextReplace,
    query: ParsedUrlQuery,
  } = useRouter()

  const push = useCallback(async (url: string) => nextPush(url), [nextPush])
  const replace = useCallback(
    async (url: string) => nextReplace(url),
    [nextReplace],
  )
  const query = useMemo(() => {
    const keys = Object.keys(ParsedUrlQuery)
    return Object.fromEntries(
      keys.map((key) => [key, String(ParsedUrlQuery[key])]),
    )
  }, [ParsedUrlQuery])

  return {
    push,
    query,
    replace,
  }
}

export const LinkComponent: LinkComponentType = ({
  href,
  children,
  ...props
}) => (
  <NextLink href={href}>
    <a {...props}>{children}</a>
  </NextLink>
)

export const useSlug = (name = 'slug'): string[] => {
  const { query } = useRouter()

  const slug = useMemo(() => {
    const querySlug = query[name]
    if (!querySlug) return []
    if (typeof querySlug === 'string') return [querySlug]
    return querySlug
  }, [query, name])

  return slug
}
