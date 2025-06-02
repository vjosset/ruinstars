import { prisma } from '@/src/lib/prisma'
import type { PrismaClient } from '@prisma/client'

export abstract class BaseRepository {
  protected prisma: PrismaClient

  constructor() {
    this.prisma = prisma
  }
}
