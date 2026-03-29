import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  coverImage?: string
}

export interface Post extends PostMeta {
  contentHtml: string
}

function parsePostFile(filename: string): PostMeta {
  const slug = filename.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, filename)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data } = matter(fileContents)

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    coverImage: data.coverImage,
  }
}

export function getAllPosts(): PostMeta[] {
  const filenames = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  return filenames
    .map(parsePostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getAllSlugs(): string[] {
  return fs.readdirSync(postsDirectory)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processed = await remark().use(remarkHtml).process(content)
  const contentHtml = processed.toString()

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? '',
    description: data.description ?? '',
    tags: data.tags ?? [],
    coverImage: data.coverImage,
    contentHtml,
  }
}
