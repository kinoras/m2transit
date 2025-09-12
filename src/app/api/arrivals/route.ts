import type { NextRequest } from 'next/server'

import type { DirectionId } from '@/types/direction'

import { getArrivalServices } from '#/services/arrivals'

import { directions } from '#/data/directions'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const directionId: DirectionId = parseInt(searchParams.get('direction')!)

    const routes = directions.find((dir) => dir.id === directionId)?.routes

    if (!routes) return Response.json([])

    const results = await Promise.all(
        routes.map(async (route) => ({
            id: route.id,
            arrivals: await getArrivalServices(route)
        }))
    )

    return Response.json(results)
}
