import AdminTools from '@/components/tools/AdminTools'
import PageTitle from '@/components/ui/PageTitle'
import { getAuthSession } from '@/src/lib/auth'
import { notFound } from 'next/navigation'

export default async function AdminPage() {
  const session = await getAuthSession()

  if (session?.user?.userId !== 'vince') return notFound()

  return (
    <div className="px-1 py-8 max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <PageTitle>Admin</PageTitle>
      </div>
      <div className="w-full max-w-2xl mx-auto px-2">
        <AdminTools />
      </div>
    </div>
  )
}
