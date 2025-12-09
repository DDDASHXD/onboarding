'use client'

import React from 'react'
import { cn } from '@/utilities/cn'
import { useOnboarding } from './onboarding-context'

interface StepIndicatorProps {
  steps: string[]
  currentStep: number
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  const { maxStepReached, setCurrentStep } = useOnboarding()

  // Map indicator index to actual step number (indicator starts at step 1, not 0)
  const getActualStepNumber = (indicatorIndex: number) => indicatorIndex + 1

  const handleStepClick = (indicatorIndex: number) => {
    const actualStep = getActualStepNumber(indicatorIndex)
    // Only allow clicking on steps that have been reached
    // maxStepReached is the actual step number (0-5), so we compare to actualStep
    if (actualStep <= maxStepReached) {
      setCurrentStep(actualStep)
    }
  }

  return (
    <div className="flex items-center justify-center gap-0 mb-12">
      {steps.map((step, indicatorIndex) => {
        const actualStep = getActualStepNumber(indicatorIndex)
        const isReached = actualStep <= maxStepReached
        const isCurrent = indicatorIndex === currentStep
        const isCompleted = indicatorIndex < currentStep

        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={() => handleStepClick(indicatorIndex)}
                disabled={!isReached}
                className={cn(
                  'text-sm font-medium transition-colors px-6 py-3 border-b-2',
                  isCurrent
                    ? 'border-black text-black'
                    : isCompleted
                      ? 'border-gray-300 text-gray-900'
                      : 'border-gray-200 text-gray-500',
                  isReached
                    ? 'cursor-pointer hover:border-gray-400 hover:text-gray-700'
                    : 'cursor-not-allowed opacity-50',
                )}
              >
                {step}
              </button>
            </div>
          </React.Fragment>
        )
      })}
    </div>
  )
}



