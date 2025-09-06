import { NextRequest, NextResponse } from 'next/server'
import { queryEngine } from '@/lib/query-engine'

export async function POST(request: NextRequest) {
  try {
    const { query, format = 'json' } = await request.json()
    
    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    const result = await queryEngine.executeQuery(query)
    
    if (format === 'csv') {
      const csv = [
        result.columns.join(','),
        ...result.rows.map(row => row.join(','))
      ].join('\n')
      
      return new NextResponse(csv, {
        headers: { 'Content-Type': 'text/csv' }
      })
    }

    return NextResponse.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Query execution failed'
    }, { status: 500 })
  }
}