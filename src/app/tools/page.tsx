import { GAME } from "@/lib/config/game_config";
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from "next/navigation";
import ToolsPageClient from './ToolsPageClient';

export const metadata = {
  title: `Tools - ${GAME.NAME}`,
  description: `Set your ${GAME.NAME} app preferences.`,
}

export default async function ToolsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/auth/login')
  }

  return (
    <ToolsPageClient userId={session?.user?.userId} />
  )
}
