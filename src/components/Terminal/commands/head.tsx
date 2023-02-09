import type { CollectionEntry } from "astro:content"

// head post1 post2
export function head(cmd: string, posts: CollectionEntry<'blog'>[]) {
  const cmdArgs = cmd.split(' ').splice(1)
  if (cmdArgs.length === 0) return <p>head: {cmd}: no arguments provided</p>

  const result: string[] = []

  posts.forEach((post) => {
    const postTitle = post.data.title.toLowerCase()
    cmdArgs.forEach((postArg) => {
      const postArgTitle = postArg.toLowerCase()
      if (postTitle === postArgTitle) {
        result.push(post.body.substring(0, 30))
      }
    })
  })

  return <p>{result.join('\n\n')}</p>
}
