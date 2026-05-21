import type { NextApiRequest, NextApiResponse } from "next"

export function applyCorsHeaders(req: NextApiRequest, res: NextApiResponse): void {
    for (const [key, value] of GetCorsHeaders(req)) {
        res.setHeader(key, value)
    }
}

export function GetCorsHeaders(req: NextApiRequest): Map<string, string> {
    const origin = req.headers["origin"]
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map(o => o.trim()) || []
    
    const headers = new Map<string, string>([
        ['Content-Type', 'application/json'],
        ['Access-Control-Allow-Methods', 'GET, OPTIONS'],
        ['Access-Control-Allow-Headers', 'Content-Type, Authorization'],
        ['Access-Control-Allow-Credentials', 'false'],
    ])
    
    if (origin) {
        headers.set('Access-Control-Allow-Origin', origin)
    } else if (allowedOrigins.length > 0 && !allowedOrigins.includes('*')) {
        headers.set('Access-Control-Allow-Origin', allowedOrigins[0])
    } else {
        headers.set('Access-Control-Allow-Origin', '*')
    }
    
    return headers
}