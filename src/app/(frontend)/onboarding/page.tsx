'use client'

import React from 'react'
import { OnboardingProvider, useOnboarding } from '@/components/Onboarding/onboarding-context'
import { StepIndicator } from '@/components/Onboarding/step-indicator'
import { IntroductionStep } from '@/components/Onboarding/introduction-step'
import { BasicInfoStep } from '@/components/Onboarding/basic-info-step'
import { RoleSelectionStep } from '@/components/Onboarding/role-selection-step'
import { RoleSpecificationsStep } from '@/components/Onboarding/role-specifications-step'
import { ProfileStep } from '@/components/Onboarding/profile-step'
import { SummaryStep } from '@/components/Onboarding/summary-step'
import { useRouter } from 'next/navigation'

interface Role {
  id: string
  name: string
  slug: string
  description: string
  image?: {
    url: string
  }
}

const steps = ['Introduction', 'Basic info', 'Role', 'Role Specifications', 'Your Profile', 'Summary']

const OnboardingContent: React.FC = () => {
  const { currentStep, data } = useOnboarding()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [roles, setRoles] = React.useState<Role[]>([])
  const [isLoadingRoles, setIsLoadingRoles] = React.useState(true)

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch('/api/onboarding/roles')
        const result = await response.json()
        if (result.success) {
          setRoles(result.roles)
        }
      } catch (error) {
        console.error('Error fetching roles:', error)
      } finally {
        setIsLoadingRoles(false)
      }
    }
    fetchRoles()
  }, [])

  const handleSubmit = React.useCallback(async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/onboarding/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to submit onboarding')
      }

      const result = await response.json()
      console.log('Onboarding submitted:', result)
      
      // Redirect to success page or dashboard
      router.push('/onboarding/success')
    } catch (error) {
      console.error('Error submitting onboarding:', error)
      alert('Failed to submit onboarding. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }, [data, router])

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {currentStep > 0 && <StepIndicator steps={steps} currentStep={currentStep} />}

        <div className="mt-8">
          {currentStep === 0 && <IntroductionStep />}
          {currentStep === 1 && <BasicInfoStep />}
          {currentStep === 2 && (
            isLoadingRoles ? (
              <div className="text-center py-12">
                <p>Loading roles...</p>
              </div>
            ) : (
              <RoleSelectionStep roles={roles} />
            )
          )}
          {currentStep === 3 && <RoleSpecificationsStep />}
          {currentStep === 4 && <ProfileStep />}
          {currentStep === 5 && <SummaryStep onSubmit={handleSubmit} isSubmitting={isSubmitting} />}
        </div>
      </div>
    </div>
  )
}

const OnboardingPage: React.FC = () => {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  )
}

export default OnboardingPage

