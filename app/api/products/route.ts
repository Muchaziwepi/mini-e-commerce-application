import { NextResponse } from 'next/server'
import { ensureProducts } from '@/lib/mongodb'

export async function GET() {
  try {
    const products = await ensureProducts()
    return NextResponse.json(products)
  } catch (error) {
    console.error('[v0] Products API error:', error)
    return NextResponse.json({ error: 'Unable to load products' }, { status: 503 })
  }
}
