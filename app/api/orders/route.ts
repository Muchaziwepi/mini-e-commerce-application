import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customer, items, total } = body
    if (!customer?.name || !customer?.email || !customer?.address || !Array.isArray(items) || items.length === 0 || typeof total !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid order fields' }, { status: 400 })
    }
    const result = await createOrder({ customer, items, total })
    return NextResponse.json({ orderId: result.insertedId.toString(), status: 'demo' }, { status: 201 })
  } catch (error) {
    console.error('[v0] Orders API error:', error)
    return NextResponse.json({ error: 'Unable to create order' }, { status: 503 })
  }
}
