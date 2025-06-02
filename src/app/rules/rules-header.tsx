import { GAME } from "@/lib/config/game_config";

export default async function RulesHeader() {
  return (
  <div className="relative pt-4">
    <div className="mx-auto h-40 w-40 mb-4 center rounded-2xl glowbox">
      <img className="mx-auto h-40 w-40 center" src="/icons/icon-big.png" />
    </div>
    <h1 className="text-center">{GAME.NAME}</h1>
  </div>
)}
