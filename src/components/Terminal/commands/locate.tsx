import type { CollectionEntry } from "astro:content"

export function locate(cmd: string, posts: CollectionEntry<'blog'>[]) {
  const query = cmd.split(' ').slice(1).join('')

  posts.forEach((post) => {
    const postTitle = post.data.title.toLowerCase()
    if (postTitle === query) return
  })

  return (
    <ul>
      {
        posts.map((post) => (
          <li key={post.slug} style={{ display: "inline-block", marginRight: "10px" }}>
            <a style={{ color: 'aquamarine' }} href={post.slug} >{post.data.title}</a>
          </li>
        ))
      }
    </ul>
  )
}
