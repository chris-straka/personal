import type { CollectionEntry } from "astro:content"

export function grep(cmd: string, posts: CollectionEntry<'blog'>[]) {
  const args = cmd.split(' ')
  if (args.length < 2) return <p>grep: {cmd}: no arguments passed in</p>

  const keyphrase = args[1]
  const result: { [title: string]: string } = {}

  posts.forEach((post) => {
    if (post.body.includes(keyphrase)) {
      result[post.data.title] = post.slug
    }
  })

  return (
    <ul>
      {
        posts.map((post) => (
          <li key={post.slug}>
            <a href={post.slug}>{post.data.title}</a>
          </li>
        ))
      }

      <style jsx>{`
        li {
          display: inline-block;
          margin-right: 10px;
        }
        a {
          color: aquamarine;
        }
    `}</style>
    </ul>
  )
}
