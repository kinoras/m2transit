import { withCache } from '#/lib/cache'
import { withLock } from '#/lib/lock'

const KEY = 'token:tdx'

/**
 * Retrieves a TDX access token.
 *
 * @returns A valid TDX access token.
 * @throws Error if the token request fails.
 */
export const getAccessToken = async (): Promise<string> => {
    // Attempt to retrieve a cached token
    const [cache, setCache] = await withCache<string>(KEY)
    if (cache) return cache

    // Lock to prevent multiple processes from requesting a token simultaneously
    return await withLock({ key: KEY, ttl: 10 }, async () => {
        // See if a cached token becomes available when waiting for the lock
        const [_cache] = await withCache<string>(KEY)
        if (_cache) return _cache

        // Request an access token
        const response = await fetch(
            'https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    grant_type: 'client_credentials',
                    client_id: process.env.TDX_CLIENT_ID!,
                    client_secret: process.env.TDX_CLIENT_SECRET!
                })
            }
        )

        if (!response.ok)
            throw new Error('Failed to request a TDX Access Token')

        const data = await response.json()
        const token: string = data.access_token
        const ttl = Math.max(1, (data.expires_in ?? 3600) - 60) // Slightly less than the actual expiry

        await setCache(token, ttl)
        return token
    })
}

/**
 * Returns an authorization header object with a valid TDX access token.
 *
 * @returns The authorization header.
 */
export const getAuthHeader = async (): Promise<{ authorization: string }> => ({
    authorization: `Bearer ${await getAccessToken()}`
})
