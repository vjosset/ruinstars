export default function IgnoreFirstMission({ keyword }: { keyword: string}) {
  return (
    <div className="rounded-md border border-main p-2">
      <em>For your first Mission, ignore {keyword} and focus on the core concepts of actions, movement, and combat.</em>
    </div>
  )
}
