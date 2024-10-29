declare module 'next-pwa' {
  import type { NextConfig } from 'next'

  interface RuntimeCacheRule {
    urlPattern: RegExp | string
    handler: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate'
    options?: {
      cacheName?: string
      expiration?: {
        maxEntries?: number
        maxAgeSeconds?: number
      }
      cacheableResponse?: {
        statuses: number[]
        headers?: Record<string, string>
      }
      matchOptions?: {
        ignoreSearch?: boolean
        ignoreVary?: boolean
      }
    }
  }

  interface PWAConfig {
    dest?: string
    disable?: boolean
    register?: boolean
    scope?: string
    sw?: string
    buildExcludes?: string[]
    publicExcludes?: string[]
    runtimeCaching?: RuntimeCacheRule[]
    fallbacks?: {
      [key: string]: string
    }
    cacheOnFrontEndNav?: boolean
    reloadOnOnline?: boolean
    customWorkerDir?: string
    dynamicStartUrl?: boolean
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig
  export = withPWA
}