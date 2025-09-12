import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

type WithRedisLockOptions = {
    /** Key of the lock. */
    key: string
    /** Expiration time of the lock (in seconds). */
    ttl: number
    /** Maximum waiting time (in milliseconds).  */
    timeout?: number
    /** Delay between retry attempts (in milliseconds). */
    retryDelay?: number
}

/**
 * Execute an async function with a Redis-based distributed lock.
 *
 * @template T - The return type of the async function.
 * @param options - Lock configuration options.
 * @param fn - The async function to execute once the lock is acquired.
 * @returns The result of the async function.
 *
 * @throws Error if the lock could not be acquired within the max waiting time.
 */
export const withLock = async <T>(
    options: WithRedisLockOptions,
    fn: () => Promise<T>
): Promise<T> => {
    const { key, ttl, timeout = 5000, retryDelay = 200 } = options

    const start = Date.now()
    const redisKey = `lock:${key}`

    while (true) {
        // Try to acquire the lock
        const locked = await redis.set(redisKey, '1', {
            nx: true, // Set key only if non-exist (unlocked)
            ex: ttl // Expiration of the key
        })

        // Run the function after lock acquired
        if (locked) {
            try {
                return await fn()
            } finally {
                // Release the lock afterward
                await redis.del(redisKey)
            }
        }

        // Timeout
        if (Date.now() - start > timeout) {
            throw new Error(
                `Timeout: Could not acquire lock "${key}" within ${timeout}ms`
            )
        }

        // Retry after waiting for `retryDelay`
        await new Promise((resolve) => setTimeout(resolve, retryDelay))
    }
}
