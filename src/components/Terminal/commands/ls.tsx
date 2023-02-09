import type { CollectionEntry } from "astro:content"

export function ls(posts: CollectionEntry<'blog'>[]) {
  return (
    <ul>
      {
        posts.map((post) => (
          <li style={{ display: 'inline-block', marginRight: '10px' }} key={post.slug}>
            <a style={{ color: 'aquamarine' }} href={post.slug}>{post.data.title}</a>
          </li>
        ))
      }
    </ul>
  )
}

export function lsl(posts: CollectionEntry<'blog'>[]) {
  return (
    <ul>
      {
        posts.map((post) => (
          <li key={post.slug}>-rw-r--r-- chris {post.data.pubDate} <a href={post.slug}>{post.data.title}</a></li>
        ))
      }

      <style jsx>{`
          a {
            color: aquamarine;
          }
        `}</style>
    </ul>
  )
}

export function lsDefault(cmd: string) {
  return <p>ls: error on {cmd}: only ls and ls -l is supported</p>
}