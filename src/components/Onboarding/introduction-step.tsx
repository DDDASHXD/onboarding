'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'

export const IntroductionStep: React.FC = () => {
  const { nextStep } = useOnboarding()

  return (
    <div className="max-w-2xl mx-auto text-center space-y-8">
      <h1 className="text-4xl font-bold">Welcome to Senpage</h1>
      <p className="text-lg text-gray-600">
        Welcome to Senpage your personalized gateway to a streamlined and engaging onboarding
        experience. Follow the steps to create your account, choose your role, and set up your
        profile. We&apos;re excited to have you with us!
      </p>

      <div className="space-y-4 text-left max-w-md mx-auto">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <span>Login to / register your account.</span>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <span>Select your role on SenPage.</span>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <span>Insert specifications for your selected role.</span>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <span>Finishing touch of your profile card</span>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />
          <span>Summary</span>
        </div>
      </div>

      <Button onClick={nextStep} size="lg" className="mt-8">
        Begin registration
      </Button>
    </div>
  )
}


