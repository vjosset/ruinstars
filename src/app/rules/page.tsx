import { GAME } from "@/lib/config/game_config";
import RulesHeader from "./rules-header"
import RulesToc from "./rules-toc"
import RulesIntro from "./rules-intro"
import RulesCoreMechanics from "./rules-coremechanics"
import RulesGameCycle from "./rules-gamecycle"
import RulesStatCards from "./rules-statcards"
import RulesActions from "./rules-actions"
import RulesMovement from "./rules-movement"
import RulesCombat from "./rules-combat"
import RulesYourSquad from "./rules-yoursquad"
import RulesMissions from "./rules-missions"
import RulesBattlefields from "./rules-battlefields"
import RulesCampaigns from "./rules-campaigns"
import RulesItems from "./rules-items"
import RulesFactions from "./rules-factions"

import { generatePageMetadata } from '@/lib/utils/generateMetadata'
import Link from "next/link";

export async function generateMetadata() {
  return generatePageMetadata({
    title: `Rules`,
    description: `The complete rules for ${GAME.NAME}, a free miniatures sci-fi skirmish wargame.`,
    image: {
      url: `/icons/icon-big.png`,
    },
    keywords: ['free', 'rules']
  })
}

export default async function Home() {
  return (
    <div className="rules px-3 max-w-7xl mx-auto">
      <RulesHeader />

      <div className="text-center text-muted max-w-lg mx-auto noprint mt-4">
        Download the Rules:
        { " " }
        <Link className="underline" target="_blank" href="/assets/RuinStars - The Rules - 20250523.pdf">Easy Print</Link>
        { " / " }
        <Link className="underline" target="_blank" href="/assets/RuinStars - The Rules - 20250523 - FullColor.pdf">Full Color</Link>
      </div>

      <RulesToc />
      <RulesIntro showTitle={true} />

      <hr />
      <RulesCoreMechanics />

      <hr />
      <RulesGameCycle />

      <hr />
      <RulesStatCards />

      <hr />
      <RulesActions />

      <hr />
      <RulesMovement />

      <hr />
      <RulesCombat />

      <hr />
      <RulesYourSquad />

      <hr />
      <RulesMissions />

      <hr />
      <RulesBattlefields />

      <hr />
      <RulesCampaigns />
      
      <hr />
      <RulesItems />
      
      <div className="printonly">
        <hr />
        <RulesFactions />
      </div>

    </div>
  )
}
