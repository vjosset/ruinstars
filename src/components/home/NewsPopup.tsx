'use client'

import { PostMeta } from '@/lib/posts'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Modal from '../ui/Modal'
import BlogCard from '../nav/BlogCard'

const NEWS_STORAGE_KEY = 'lastSeenNewsTimestamp'

export default function NewsPopup() {
  const [unseenPosts, setUnseenPosts] = useState<PostMeta[]>([])
  const [allPosts, setAllPosts] = useState<PostMeta[]>([])
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/posts', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => setAllPosts(data))
      .catch((err) => console.error('Failed to fetch posts:', err))
  }, [pathname])

  useEffect(() => {
    if (allPosts.length === 0) return
    const lastSeen = localStorage.getItem(NEWS_STORAGE_KEY)
    const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    if (!lastSeen || new Date(lastSeen) < ninetyDaysAgo) {
      const latestDate = allPosts.reduce((latest, post) => post.date > latest ? post.date : latest, allPosts[0].date)
      localStorage.setItem(NEWS_STORAGE_KEY, latestDate)
      return
    }
    const unseen = allPosts
      .filter(post => new Date(post.date) > new Date(lastSeen))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 3)
    setUnseenPosts(unseen)
  }, [allPosts])

  const handleDismiss = () => {
    if (unseenPosts.length > 0) {
      localStorage.setItem(NEWS_STORAGE_KEY, unseenPosts[0].date)
    }
    setUnseenPosts([])
  }

  return unseenPosts.length > 0 && (
    <Modal
      title="What's New"
      children={(
        <div className="space-y-4 max-h-[90vh] overflow-y-auto">
          {unseenPosts.map((post) => (
            <BlogCard key={post.slug} post={post} hideImages={true} />
          ))}
        </div>)}
      onClose={handleDismiss}
    />
  )
}
