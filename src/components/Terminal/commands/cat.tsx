import type { CollectionEntry } from "astro:content"

/**
 * 
 * @param cmd cat post1 post2
 * @param posts [{frontmatter, content}, {frontmatter, content}]
 * @returns 
 */
export function cat(cmd: string, posts: CollectionEntry<'blog'>[]) {
  const postArgs = cmd.split(' ').slice(1)

  if (postArgs.length === 0) return <p>cat: {cmd}: no arguments provided</p>

  const result: string[] = []

  posts.forEach((post) => {
    const postTitle = post.data.title.toLocaleLowerCase()
    postArgs.forEach((postArg) => {
      const postArgTitle = postArg.toLowerCase()
      if (postTitle === postArgTitle) result.push(post.body)
    })
  })

  return <p>{result.join('\n\n')}</p>
}