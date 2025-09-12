import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

type CacheResult<T> = T | null
type CacheSetter<T> = (data: T, ttl: number) => Promise<void>

/**
 * Provides a getter and setter for cached data with a specific key.
 *
 * @template T - Type of the cached data.
 * @param key - Key of the cached data.
 * @returns A tuple containing the cached value (null if not found) and a function to set the cache.
 */
export const withCache = async <T>(
    key: string
): Promise<[CacheResult<T>, CacheSetter<T>]> => {
    // Cache key with prefix
    const redisKey = `data:${key}`

    // Try to retrieve cached value
    const cache: CacheResult<T> = await redis.get<T>(redisKey)

    /**
     * Set the cache with an expiration time.
     *
     * @param data - The data to cache.
     * @param ttl - Expiration time (in seconds).
     */
    const setter: CacheSetter<T> = async (data, ttl) => {
        await redis.set(redisKey, data, { ex: ttl })
    }

    return [cache, setter]
}

export default withCache
