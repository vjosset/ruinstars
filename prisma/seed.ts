import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

async function runSeed(seed: any) {
  // Users
  if (seed.users) {
    console.log('  Seeding Users...')
    for (const user of seed.users) {
      // Seed user
      await prisma.user.upsert({
        where: { userId: user.userId },
        update: {},
        create: {
          userId: user.userId,
          userName: user.userName,
          password: await hash(user.password, 10)
        }
      })
    }
  }
  
  // GearCategories
  if (seed.gearCategories) {
    console.log('  Seeding GearCategories...')
    for (const gearCategory of seed.gearCategories) {
      // Seed gearCategory
      await prisma.gearCategory.upsert({
        where: { gearCategoryId: gearCategory.gearCategoryId },
        update: {},
        create: {
          ...gearCategory
        }
      })
    }
  }
  
  // Gears
  if (seed.gears) {
    console.log('  Seeding Gears...')
    for (const gear of seed.gears) {
      // Seed gear
      await prisma.gear.upsert({
        where: { gearId: gear.gearId },
        update: {},
        create: {
          ...gear   
        }
      })
    }
  }

  // SquadTypes
  if (seed.squadTypes) {
    console.log('  Seeding SquadTypes...')
    for (const squadType of seed.squadTypes) {
      // Seed squadType
      await prisma.squadType.upsert({
        where: { squadTypeId: squadType.squadTypeId },
        update: {},
        create: {
          ...squadType
        },
      })
    }
  }

  // UnitTypes
  if (seed.unitTypes) {
    console.log('  Seeding UnitTypes...')
    for (const unitType of seed.unitTypes) {
      await prisma.unitType.upsert({
        where: { unitTypeId: unitType.unitTypeId },
        update: {},
        create: {
          ...unitType,
        },
      })
    }
  }

  // Squads
  if (seed.squads) {
    console.log('  Seeding squads...')
    for (const squad of seed.squads) {
      // Seed squad
      await prisma.squad.upsert({
        where: { squadId: squad.squadId },
        update: {},
        create: {
          ...squad
        }
      })
    }
  }
  
  // Units
  if (seed.units) {
    console.log('  Seeding Units...')
    for (const unit of seed.units) {
      // Seed unit
      const u = JSON.parse(JSON.stringify(unit))
      await prisma.unit.upsert({
        where: { unitId: unit.unitId },
        update: {},
        create: {
          ...u
        }
      })
    }
  }
  
  // Specials
  if (seed.specials) {
    console.log('  Seeding Specials...')
    for (const special of seed.specials) {
      // Seed special
      const spec = JSON.parse(JSON.stringify(special))
      await prisma.special.upsert({
        where: { specialId: spec.specialId },
        update: {},
        create: {
          ...spec
        }
      })
    }
  }
  
  // Medals
  if (seed.medals) {
    console.log('  Seeding Medals...')
    for (const medal of seed.medals) {
      // Seed medal
      const med = JSON.parse(JSON.stringify(medal))
      await prisma.medal.upsert({
        where: { medalId: med.medalId },
        update: {},
        create: {
          ...med
        }
      })
    }
  }
  
  // Missions
  if (seed.missions) {
    console.log('  Seeding Missions...')
    for (const mission of seed.missions) {
      // Seed mission
      const mis = JSON.parse(JSON.stringify(mission))
      await prisma.mission.upsert({
        where: { missionId: mis.missionId },
        update: {},
        create: {
          ...mis
        }
      })
    }
  }

  // Finally, update special users' passwords so they can't log in
  prisma.user.updateMany(
    {
      data: {
        password: 'NoCantLogInGetOutOfhere'
      },
      where: {
        userId: {
          in: [
            'ruinstars'
          ]
        }
      }
    }
  )
}

async function main() {
  console.log('🌱 Seeding core data...')

  // Load core data
  const dataPath = path.join(__dirname, 'seed-data-core.json')
  const json = await fs.readFile(dataPath, 'utf-8')
  const seed = JSON.parse(json)

  // Run the seed
  await runSeed(seed)

  console.log('✅ Seeding complete.')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
