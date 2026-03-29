import { getAllPosts } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import Link from 'next/link'

export async function generateMetadata() {
  return generatePageMetadata({
    title: 'Blog',
    description: 'Updates, design notes, and dispatches from a dying galaxy.',
    keywords: ['blog', 'news', 'updates', 'design notes'],
    pagePath: '/blog',
  })
}

export default function BlogIndexPage() {
  const posts = getAllPosts()

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h3 className="font-title text-main mb-2">Ruinstars Blog</h3>
      <p className="text-muted mb-10">Updates, design notes, and dispatches from a dying galaxy.</p>

      {posts.map(post => (
        <div key={post.slug} className="mb-4">
          <Link href={`/blog/${post.slug}`} className="group block">
            {post.coverImage && (
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-48 object-cover mb-4"
              />
            )}
            <h4 className="font-title text-main">
              {post.title}
            </h4>
          </Link>

          <p className="text-sm text-muted mt-1 mb-2">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>

          {post.description && (
            <p>{post.description}</p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 border border-border">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <hr/>
        </div>
      ))}
    </div>
  )
}
