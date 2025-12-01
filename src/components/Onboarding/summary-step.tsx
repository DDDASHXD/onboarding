'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

interface SummaryStepProps {
  onSubmit: () => Promise<void>
  isSubmitting: boolean
}

export const SummaryStep: React.FC<SummaryStepProps> = ({ onSubmit, isSubmitting }) => {
  const { data, previousStep } = useOnboarding()

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-4">Summary</h2>
      <p className="text-center text-gray-600 mb-8">Here is a list of... (keep going)</p>

      <div className="space-y-6">
        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Basic Info</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Full Name</p>
              <p className="font-medium">
                {data.firstName} {data.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Country</p>
              <p className="font-medium">{data.country}</p>
            </div>
            <div>
              <p className="text-gray-600">Role</p>
              <p className="font-medium capitalize">{data.roleSlug || 'Not selected'}</p>
            </div>
          </div>
        </div>

        {data.roleSlug === 'founder' && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Company Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Company Name</p>
                <p className="font-medium">{data.companyName}</p>
              </div>
              <div>
                <p className="text-gray-600">Description</p>
                <p className="font-medium">{data.companyDescription}</p>
              </div>
              <div>
                <p className="text-gray-600">Primary Focus</p>
                <p className="font-medium">{data.primaryFocus?.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-600">Looking For</p>
                <p className="font-medium">{data.lookingFor?.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-600">Contact Email</p>
                <p className="font-medium">{data.contactEmail}</p>
              </div>
            </div>
          </div>
        )}

        {data.roleSlug === 'mentor' && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Mentor Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Expertise</p>
                <p className="font-medium">{data.expertise?.join(', ')}</p>
              </div>
              <div>
                <p className="text-gray-600">Branch</p>
                <p className="font-medium">{data.branch}</p>
              </div>
              <div>
                <p className="text-gray-600">Job Title</p>
                <p className="font-medium">{data.jobTitle}</p>
              </div>
              <div>
                <p className="text-gray-600">Preferred Language</p>
                <p className="font-medium">{data.preferredLanguage}</p>
              </div>
            </div>
          </div>
        )}

        {data.roleSlug === 'investor' && (
          <div className="bg-white border rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">Investor Details</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-600">Job Title</p>
                <p className="font-medium">{data.jobTitle}</p>
              </div>
              <div>
                <p className="text-gray-600">Ready to Invest</p>
                <p className="font-medium">{data.readyToInvest ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-gray-600">Expertise</p>
                <p className="font-medium">{data.expertise?.join(', ')}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white border rounded-lg p-6">
          <h3 className="font-semibold text-lg mb-4">Profile</h3>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Nickname</p>
              <p className="font-medium">{data.nickname || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Bio</p>
              <p className="font-medium">{data.bio || 'Not provided'}</p>
            </div>
            <div>
              <p className="text-gray-600">Tags</p>
              <p className="font-medium">{data.tags?.join(', ') || 'None'}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button type="button" variant="outline" onClick={previousStep} disabled={isSubmitting}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous step
        </Button>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Complete Registration'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}


