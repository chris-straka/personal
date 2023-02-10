import type { CollectionEntry } from "astro:content"

export function ls(posts: CollectionEntry<'blog'>[]) {
  return (
    <ul style={{ listStyleType: 'none', padding: '0', lineHeight: '1.6' }}>
      {
        posts.map((post) => (
          <li key={post.slug}>
            <a href={post.slug} style={{ color: 'aquamarine' }}>{post.data.title}</a>
          </li>
        ))
      }
    </ul>
  )
}

export function lsl(posts: CollectionEntry<'blog'>[]) {
  console.log(posts)
  return (
    <ul style={{ listStyleType: 'none', padding: '0' }}>
      {
        posts.map((post) => (
          <li key={post.slug}>
            -rw-r--r-- chris {post.data.pubDate.toDateString()} <a href={post.slug} style={{ color: 'aquamarine' }}>{post.data.title}</a>
          </li>
        ))
      }
    </ul>
  )
}

export function lsDefault(cmd: string) {
  return <p>ls: error on {cmd}: only ls and ls -l is supported</p>
}