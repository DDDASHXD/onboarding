import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const data = await request.json()

    // Prepare submission data, only including defined values
    const submissionData: any = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      role: data.roleId,
    }

    // Add optional basic fields
    if (data.country) submissionData.country = data.country

    // Add founder-specific fields
    if (data.companyName) submissionData.companyName = data.companyName
    if (data.companyDescription) submissionData.companyDescription = data.companyDescription
    if (data.primaryFocus?.length) {
      submissionData.primaryFocus = data.primaryFocus.map((focus: string) => ({ focus }))
    }
    if (data.lookingFor?.length) {
      submissionData.lookingFor = data.lookingFor.map((item: string) => ({ item }))
    }
    if (data.primaryContactPerson) submissionData.primaryContactPerson = data.primaryContactPerson
    if (data.contactEmail) submissionData.contactEmail = data.contactEmail
    if (data.companyPhone) submissionData.companyPhone = data.companyPhone

    // Add mentor-specific fields
    if (data.expertise?.length) {
      submissionData.expertise = data.expertise.map((skill: string) => ({ skill }))
    }
    if (data.branch) submissionData.branch = data.branch
    if (data.jobTitle) submissionData.jobTitle = data.jobTitle
    if (data.accessibility) submissionData.accessibility = data.accessibility
    if (data.preferredLanguage) submissionData.preferredLanguage = data.preferredLanguage

    // Add investor-specific fields
    if (typeof data.readyToInvest === 'boolean') {
      submissionData.readyToInvest = data.readyToInvest
    }

    // Add profile fields
    if (data.nickname) submissionData.nickname = data.nickname
    if (data.bio) submissionData.bio = data.bio
    if (data.tags?.length) {
      submissionData.tags = data.tags.map((tag: string) => ({ tag }))
    }

    // Create the user submission
    const submission = await payload.create({
      collection: 'user-submissions',
      data: submissionData,
    })

    return NextResponse.json({
      success: true,
      submission,
    })
  } catch (error: any) {
    console.error('Error creating submission:', error)
    return NextResponse.json(
      {
        success: false,
        error: error?.message || 'Failed to create submission',
        details: error?.data || null,
      },
      { status: 500 },
    )
  }
}

