export default function IgnoreFirstMission({ keyword }: { keyword: string}) {
  return (
    <div className="rounded-md border border-main p-2 mx-16">
      <em>For your first Mission, ignore {keyword}.<br/>Instead, focus on the core concepts of actions, movement, and combat.</em>
    </div>
  )
}
