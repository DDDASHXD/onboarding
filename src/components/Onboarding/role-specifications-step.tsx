'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { FounderSpecifications } from './founder-specifications'
import { MentorSpecifications } from './mentor-specifications'
import { InvestorSpecifications } from './investor-specifications'

export const RoleSpecificationsStep: React.FC = () => {
  const { data } = useOnboarding()

  switch (data.roleSlug) {
    case 'founder':
      return <FounderSpecifications />
    case 'mentor':
      return <MentorSpecifications />
    case 'investor':
      return <InvestorSpecifications />
    case 'student':
      return <MentorSpecifications />
    default:
      return (
        <div className="text-center">
          <p>Please select a role first</p>
        </div>
      )
  }
}

