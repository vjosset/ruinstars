import { PrismaClient, Faction, GearCategory, Gear, UnitType, Mission, Battlefield, Special, User, Squad, Unit } from '@prisma/client'
import fs from 'fs/promises'

const prisma = new PrismaClient()

async function main() {
  const output: {
    factions: Faction[]
    gearCategories: GearCategory[]
    gears: Gear[]
    unitTypes: UnitType[]
    missions: Mission[]
    battlefields: Battlefield[]
    specials: Special[]
    users: User[]
    squads: Squad[]
    units: Unit[]
  } = {
    factions: [],
    gearCategories: [],
    gears: [],
    unitTypes: [],
    missions: [],
    battlefields: [],
    specials: [],
    users: [],
    squads: [],
    units: []
  }

  output.factions = await prisma.faction.findMany(
    {
      orderBy: {seq: 'asc'}
    }
  )

  output.gearCategories = await prisma.gearCategory.findMany(
    {
      orderBy: [
        {seq: 'asc'}
      ]
    }
  )

  output.gears = await prisma.gear.findMany(
    {
      orderBy: [
        {gearId: 'asc'},
        {seq: 'asc'}
      ]
    }
  )

  output.unitTypes = await prisma.unitType.findMany(
    {
      orderBy: [
        {factionId: 'asc'},
        {seq: 'asc'}
      ]
    }
  )

  output.missions = await prisma.mission.findMany(
    {
      orderBy: [
        {missionId: 'asc'}
      ]
    }
  )

  output.battlefields = await prisma.battlefield.findMany(
    {
      orderBy: [
        {battlefieldId: 'asc'}
      ]
    }
  )

  output.specials = await prisma.special.findMany(
    {
      orderBy: [
        {scope: 'asc'},
        {specialId: 'asc'}
      ]
    }
  )

  output.users = await prisma.user.findMany(
    {
      where: {
        userId: {
          in: [ 'ruinstars', 'u1' ]
        }
      }
    }
  )

  output.squads = await prisma.squad.findMany(
    {
      where: {
        userId: {
          in: [ 'ruinstars', 'u1' ]
        }
      },
      orderBy: [
        {seq: 'asc'}
      ]
    }
  )

  output.units = await prisma.unit.findMany(
    {
      where: {
        squadId: {
          in: output.squads.map((s) => s.squadId)
        }
      },
      orderBy: [
        {squadId: 'asc'},
        {seq: 'asc'}
      ]
    }
  )

  // All done
  const now = new Date()
  const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19)
  await fs.writeFile(`seed-core-data-${timestamp}.json`, JSON.stringify(output, null, 2))
}

main()
  .catch((e) => {
    console.error('❌ SeedGen failed:', e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
