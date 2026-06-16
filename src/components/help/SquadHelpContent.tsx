export default function SquadHelpContent() {
  return (
    <div className="space-y-2">
      <div>
        <h6 className="text-main">Adding &amp; Editing Units</h6>
        <p>
          Use the <strong>"Add Unit"</strong> button to add new Units to your Squad.
          Tap a Unit's name or the Edit menu entry (⋮ → Edit) to modify its weapon and skill selections.
          Use the Unit's menu (⋮ → Delete) to Delete it.
        </p>
      </div>
      
      <div>
        <h6 className="text-main">Weapon and Skill Details</h6>
        <p>
          Tap any Weapon or Skill to view its full details and description, including weapon specials.
        </p>
      </div>

      <div>
        <h6 className="text-main">HIT Points</h6>
        <p>
          Tap the Unit's <code>HIT</code> stat to change its current Hit points.
          A Unit reduced to <code>0 HIT</code> is <strong>Taken Out</strong>.
        </p>
      </div>

      <div>
        <h6 className="text-main">Activations</h6>
        <p>
          Tap a Unit's <strong>Activation Checkbox</strong> to toggle it between Ready and Activated.
          Advancing the Turn counter resets all Unit Activations automatically.
        </p>
      </div>

      <div>
        <h6 className="text-main">TURN/MP/TO</h6>
        <p>
          Use the tracker bar at the top to manage the current <strong>Turn, Mission Points (MP), and Tactical Orders (TO)</strong>.
          Advancing the Turn counter resets the Squad's <strong>TO</strong> to zero.
        </p>
      </div>

      <div>
        <h6 className="text-main">Resetting Between Missions</h6>
        <p>
          Use <strong>⋮ → Reset</strong> to restore HIT, Activations, TO, and Turn to their starting state.
          You can optionally keep or clear MP, injuries, and Spoils of War.
        </p>
      </div>

      <div>
        <h6 className="text-main">Squad Name, Portrait, and Notes</h6>
        <p>
          Tap the Squad's name to edit its name, set its portrait, or save notes (for example for campaign progress).
        </p>
      </div>

      <p className="text-muted text-xs">
        You can view this help dialog at any time in the Squad menu (⋮ → Help).
      </p>
    </div>
  )
}
