import type { NextRequest } from 'next/server'

import type { DirectionId } from '@/types/direction'

import { directions } from '@/server/data/directions'
import { arrivalServices } from '@/server/services/arrivals'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const directionId: DirectionId = parseInt(searchParams.get('direction')!)

    const routes = directions.find((dir) => dir.id === directionId)?.routes

    if (!routes) return Response.json([])

    const results = await Promise.all(
        routes.map(async (route) => ({
            id: route.id,
            arrivals: await arrivalServices[route.method](route as any)
        }))
    )

    return Response.json(results)
}
