import { getPostBySlug, getAllSlugs } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import { dateToDisplay } from '@/lib/utils/utils'
import { notFound } from 'next/navigation'
import Link from 'next/link'

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
    <div>
      {/* Hero image - full width with gradient overlay and title */}
      {post.coverImage && (
        <div className="relative w-full overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full max-h-[40vh] object-cover brightness-75"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,.7) 70%, rgba(0,0,0,1) 100%)' }}
          />
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6 py-8">
        <nav className="flex items-center gap-2 text-sm text-muted mb-4">
          <Link href="/blog" className="hover:text-main transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-zinc-400">{post.title}</span>
        </nav>

        <h1
          className="font-title text-main text-4xl md:text-5xl uppercase tracking-wide leading-tight"
          style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
        >
          {post.title}
        </h1>
        
        <p className="text-sm text-muted mb-3">
          {dateToDisplay(post.date)}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
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
    </div>
  )
}
