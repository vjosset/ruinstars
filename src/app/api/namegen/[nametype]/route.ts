import { name_aesbaer } from '@/lib/namegen/aesbaer'
import { name_bearaxe } from '@/lib/namegen/bearaxe'
import { name_corvius } from '@/lib/namegen/corvius'
import { name_czigheo } from '@/lib/namegen/czigheo'
import { name_decaeta } from '@/lib/namegen/decaeta'
import { name_fyhucho } from '@/lib/namegen/fyhucho'
import { getRandom, ucwords } from '@/lib/utils/utils'
import { NextResponse } from 'next/server'

// Get a name
export async function GET(req: Request, { params }: { params: Promise<{ nametype: string }> }) {
  let { nametype } = await params

  if (nametype.includes(',')) {
    const nametypes = nametype.split(',')
    nametype = getRandom(nametypes)
  }

  switch (nametype) {
  case 'AESBAER':
    return new NextResponse(ucwords(name_aesbaer()), { status: 200, statusText: 'OK' })
  case 'CORVIUS':
    return new NextResponse(ucwords(name_corvius()), { status: 200, statusText: 'OK' })
  case 'DECAETA':
    return new NextResponse(ucwords(name_decaeta()), { status: 200, statusText: 'OK' })
  case 'FYHUCHO':
    return new NextResponse(ucwords(name_fyhucho()), { status: 200, statusText: 'OK' })
  case 'BEARAXE':
    return new NextResponse(ucwords(name_bearaxe()), { status: 200, statusText: 'OK' })
  case 'CZIGHEO':
    return new NextResponse(ucwords(name_czigheo()), { status: 200, statusText: 'OK' })
  default:
    return new NextResponse(nametype, { status: 200, statusText: 'OK' })
  }
}
