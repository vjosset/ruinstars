import { dateToDisplay } from '@/lib/utils/utils'
import Link from 'next/link'

export default function BlogCard({ post, hideImages }: { post: any, hideImages?: boolean | false }) {
  return (
    <div className="group relative border border-border rounded overflow-hidden hover:border-main transition-colors duration-200 mb-4">

      {/* Hero image with gradient overlay */}
      {(post.coverImage && !hideImages) ? (
        <div className="relative w-full h-52 overflow-hidden">
          <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-95 group-hover:scale-[1.02] transition-all duration-400"
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 70%, rgba(0,0,0,1) 100%)' }}
            />
          </Link>
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-2 z-10">
            <Link href={`/blog/${post.slug}`}>
              <h4 className="text-main font-title" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                {post.title}
              </h4>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-card p-2">
          <Link href={`/blog/${post.slug}`}>
            <h4 className="text-main font-title">
              {post.title}
            </h4>
          </Link>
        </div>
      )}

      {/* Metadata strip */}
      <div className="bg-card p-2">
        <p className="text-muted mb-1">{dateToDisplay(post.date)}</p>
        {post.description && (
          <p className="line-clamp-2 mb-2">{post.description}</p>
        )}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs px-2 py-0.5 border border-border rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
