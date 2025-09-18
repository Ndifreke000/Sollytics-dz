import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { wallet } = await request.json()

    if (!wallet || wallet.length !== 44) {
      return NextResponse.json(
        { error: 'Invalid wallet address' },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('admin_settings')
      .upsert({ 
        key: 'admin_wallet', 
        value: wallet,
        updated_at: new Date().toISOString()
      })

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update wallet' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('admin_settings')
      .select('value')
      .eq('key', 'admin_wallet')
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return NextResponse.json({ 
      wallet: data?.value || process.env.DEFAULT_ADMIN_WALLET 
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to get wallet' },
      { status: 500 }
    )
  }
}