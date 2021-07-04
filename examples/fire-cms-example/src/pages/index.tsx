import NextLink from 'next/link'

const IndexEntry = () => {
  return (
    <div>
      <h1>普通のページです</h1>
      <NextLink href="/admin">
        <a>管理ページ</a>
      </NextLink>
    </div>
  )
}
export default IndexEntry
