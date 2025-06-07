/*
  This file contains code to pull data from the main database to be converted to JSON objects for seeding.
  This is used when playtesting and maintenance involves updates directly in the DB and we want to rebuild the seeding scripts for others to contribute to the project.
*/

import { PrismaClient } from '@prisma/client'
import fs from 'fs/promises'
import path from 'path'

const prisma = new PrismaClient()

async function exportCoreData() {
  try {
    // Get data from database
    const [
      factions,
      gearCategories,
      gears,
      unitTypes, 
      missions,
      battlefields,
      specials,
      users,
      squads,
      units
    ] = await Promise.all([
      prisma.faction.findMany({ orderBy: { seq: 'asc' } }),
      prisma.gearCategory.findMany({ orderBy: { seq: 'asc' } }),
      prisma.gear.findMany({ orderBy: { gearId: 'asc' } }),
      prisma.unitType.findMany({ orderBy: [{ factionId: 'asc' }, { seq: 'asc' }] }),
      prisma.mission.findMany({ orderBy: [{ missionType: 'asc' }, { missionId: 'asc' }] }),
      prisma.battlefield.findMany({ orderBy: { battlefieldId: 'asc' } }),
      prisma.special.findMany({ orderBy: [{scope: 'asc'}, {code: 'asc' }]}),
      prisma.user.findMany({ where: { userId: 'ruinstars' }}),
      prisma.squad.findMany({
        where: { userId: 'ruinstars' },
        orderBy: { seq: 'asc' }
      }),
      prisma.unit.findMany({
        where: {
          squad: {
            userId: 'ruinstars'
          }
        },
        orderBy: { seq: 'asc' }
      })
    ])

    // Combine into single object
    const coreData = {
      factions,
      gearCategories,
      gears,
      unitTypes,
      missions,
      battlefields,
      specials,
      users,
      squads,
      units
    }

    // Write to file
    await fs.writeFile(
      path.join(__dirname, '../prisma/seed-data-core.json'),
      JSON.stringify(coreData, null, 2)
    )

    console.log('Core data exported successfully')
  } catch (error) {
    console.error('Error exporting core data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run if called directly
if (require.main === module) {
  exportCoreData()
}
