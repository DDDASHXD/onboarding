'use client'

import React from 'react'
import { cn } from '@/utilities/cn'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'text-sm font-medium transition-colors px-6 py-3 border-b-2',
                index === currentStep
                  ? 'border-black text-black'
                  : index < currentStep
                    ? 'border-gray-300 text-gray-900'
                    : 'border-gray-200 text-gray-500',
              )}
            >
              {step}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

