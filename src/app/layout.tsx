import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import Bootstrapper from '@/store/Bootstrapper'

import './globals.css'

export const metadata: Metadata = {
    title: 'm2transit',
    appleWebApp: { capable: true, statusBarStyle: 'black-translucent' },
    other: { 'apple-mobile-web-app-capable': 'yes' } // Workaround
}

export const viewport: Viewport = {
    viewportFit: 'cover'
}

export default function RootLayout({
    children
}: Readonly<{ children: ReactNode }>) {
    return (
        <html lang="zh-tw">
            <body>
                <Bootstrapper />
                {children}
            </body>
        </html>
    )
}
