'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'

const OnboardingSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold">Registration Complete!</h1>
        
        <p className="text-gray-600">
          Thank you for completing your onboarding. Your profile has been created successfully.
        </p>
        
        <div className="pt-4">
          <Link href="/">
            <Button size="lg">Go to Homepage</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OnboardingSuccessPage


