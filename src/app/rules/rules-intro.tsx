import { GAME } from "@/lib/config/game_config";

export default async function RulesIntro({ showTitle = false }) {
  return (
    <div className="section">
      {showTitle && (
        <h2 className="text-center py-3 font-title"   id="introduction">
          1. Introduction
        </h2>
      )}
      <div className="twocols">
        <div className="section">
          <h3>The galaxy is in ruins</h3>
          <div className="flavor">
            The stars are dying, the gods are silent, and the empires that once ruled the galaxy have crumbled into ash and echoes.<br/>
            Across a fractured void of decaying worlds and haunted relics, scattered fireteams carry out the final orders of long-dead masters.<br/>
            There is no hope of victory - only duty and the bitter certainty that each mission may be the last.<br/>
            In the shadows of ancient horrors and cursed machines, elite squads wage desperate black ops in a war that has lost all meaning... but not all purpose.<br/>
            <br/>
            Welcome to {GAME.NAME} - where only ruins remain, and only war endures.
          </div>
        </div>
        <div className="section">
          <h3>What Is This Game?</h3>
          <p>
            {GAME.NAME} is a fast-paced, miniatures-agnostic tabletop skirmish game set during the final age of the galaxy.<br/>
            Players command small, hardened squads in high-lethality black ops missions across fractured star-systems.<br/>
            Fight in the shadows of dying gods, decaying empires, and forgotten horrors as the last battles rage.
          </p>
        </div>
      </div>
    </div>
)}
