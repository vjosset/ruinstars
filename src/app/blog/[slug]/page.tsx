import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  try {
    const post = await getPostBySlug(slug)
    return generatePageMetadata({
      title: post.title,
      description: post.description,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
      keywords: post.tags,
      pagePath: `/blog/${slug}`,
    })
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params

  let post
  try {
    post = await getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {post.coverImage && (
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-64 object-cover mb-8 opacity-90"
        />
      )}

      <h1 className="font-title text-main text-4xl">{post.title}</h1>

      <p className="text-sm text-muted">
        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 border border-zinc-700 text-zinc-400">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div
        className="blog-content max-w-none"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </div>
  )
}
