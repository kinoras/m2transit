import { directions } from '@/server/data/directions'

export const revalidate = 604800

export async function GET() {
    return Response.json(directions, {
        headers: { 'Cache-Control': `max-age=${revalidate}` }
    })
}
