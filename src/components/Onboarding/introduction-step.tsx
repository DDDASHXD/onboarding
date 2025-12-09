'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { BrainIcon, DoorOpenIcon, ListCheckIcon, ShieldIcon, User2Icon } from 'lucide-react'

export const IntroductionStep: React.FC = () => {
  const { nextStep } = useOnboarding()

  return (
    <div className="mx-auto max-w-2xl space-y-8 text-center">
      <h1 className="text-4xl font-bold">Welcome to Senpage</h1>
      <p className="text-lg text-gray-600">
        Welcome to Senpage your personalized gateway to a streamlined and engaging onboarding
        experience. Follow the steps to create your account, choose your role, and set up your
        profile. We&apos;re excited to have you with us!
      </p>

      <div className="bg-secondary mx-auto max-w-md space-y-4 rounded-lg p-4 text-left">
        <div className="flex items-start gap-3">
          <DoorOpenIcon className="mt-0.5 h-6 w-6 shrink-0" />
          <span>Login to / register your account.</span>
        </div>
        <div className="flex items-start gap-3">
          <ShieldIcon className="mt-0.5 h-6 w-6 shrink-0" />
          <span>Select your role on Senpage.</span>
        </div>
        <div className="flex items-start gap-3">
          <BrainIcon className="mt-0.5 h-6 w-6 shrink-0" />
          <span>Insert specifications for your selected role.</span>
        </div>
        <div className="flex items-start gap-3">
          <User2Icon className="mt-0.5 h-6 w-6 shrink-0" />
          <span>Finishing touch of your profile card</span>
        </div>
        <div className="flex items-start gap-3">
          <ListCheckIcon className="mt-0.5 h-6 w-6 shrink-0" />
          <span>Summary</span>
        </div>
      </div>

      <Button onClick={nextStep} size="lg" className="mt-8">
        Begin registration
      </Button>
    </div>
  )
}
