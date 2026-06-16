export default function HelpContent() {
  return (
    <div className="space-y-2">
      <div>
        <p>
          Your <strong>Squads</strong> are listed on this page.
          First-time users will see a few pre-built Squads to get you started.
          Each card shows your Squad's Units and total GP.
        </p>
      </div>

      <div>
        <h6 className="text-main">Adding a Squad</h6>
        <p>
          Use the <strong>"New Squad"</strong> button to create a new Squad.
          Select your Squad Type and optionally import the default setup for that Squad Type as a starting point.
        </p>
      </div>

      <div>
        <h6 className="text-main">Viewing a Squad</h6>
        <p>
          Tap any Squad card to view its details, including its game state (Turn/MP/TO) and Units.
        </p>
      </div>

      <div>
        <h6 className="text-main">Managing your Squads</h6>
        <p>
          Use each Squad's menu (⋮) to edit, delete, clone, or rearrange your Squads.
        </p>
      </div>
    </div>
  )
}
