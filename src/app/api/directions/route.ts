import { directions } from '#/data/directions'

export const revalidate = 604800

export async function GET() {
    return Response.json(directions, {
        headers: { 'Cache-Control': `max-age=${revalidate}` }
    })
}
