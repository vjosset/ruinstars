import BlogCard from '@/components/nav/BlogCard'
import { getAllPosts } from '@/lib/posts'
import { generatePageMetadata } from '@/lib/utils/generateMetadata'

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
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
