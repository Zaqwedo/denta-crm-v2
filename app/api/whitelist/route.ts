import { NextRequest, NextResponse } from 'next/server'
import { getWhitelistEmails } from '@/lib/admin-db'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const provider = searchParams.get('provider') as 'google' | 'yandex' | 'email' | null
    
    const emails = await getWhitelistEmails(provider || undefined)
    return NextResponse.json({ emails: emails.map(e => e.email) })
  } catch (error) {
    console.error('Get whitelist error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
