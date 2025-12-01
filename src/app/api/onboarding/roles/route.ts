import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const roles = await payload.find({
      collection: 'onboarding-roles',
      where: {
        active: {
          equals: true,
        },
      },
      limit: 100,
    })

    return NextResponse.json({
      success: true,
      roles: roles.docs,
    })
  } catch (error) {
    console.error('Error fetching roles:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch roles',
      },
      { status: 500 },
    )
  }
}

