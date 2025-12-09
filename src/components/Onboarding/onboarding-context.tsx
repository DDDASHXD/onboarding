'use client'

import React from 'react'

export interface OnboardingData {
  // Basic Info
  firstName: string
  lastName: string
  email: string
  country: string
  password: string
  
  // Role
  roleId: string | null
  roleSlug: string | null
  
  // Founder specific
  companyName?: string
  companyDescription?: string
  primaryFocus?: string[]
  lookingFor?: string[]
  primaryContactPerson?: string
  contactEmail?: string
  companyPhone?: string
  
  // Mentor specific
  expertise?: string[]
  branch?: string
  jobTitle?: string
  accessibility?: string
  preferredLanguage?: string
  
  // Investor specific
  readyToInvest?: boolean
  
  // Profile
  nickname?: string
  bio?: string
  tags?: string[]
  profileImage?: string
}

interface OnboardingContextType {
  currentStep: number
  maxStepReached: number
  setCurrentStep: (step: number) => void
  data: OnboardingData
  updateData: (data: Partial<OnboardingData>) => void
  nextStep: () => void
  previousStep: () => void
}

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined)

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStepState] = React.useState(0)
  const [maxStepReached, setMaxStepReached] = React.useState(0)
  const [data, setData] = React.useState<OnboardingData>({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    password: '',
    roleId: null,
    roleSlug: null,
  })

  const updateData = React.useCallback((newData: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...newData }))
  }, [])

  const setCurrentStep = React.useCallback((step: number) => {
    // Only allow navigation to steps that have been reached
    if (step <= maxStepReached && step >= 0) {
      setCurrentStepState(step)
    }
  }, [maxStepReached])

  const nextStep = React.useCallback(() => {
    setCurrentStepState((prev) => {
      const next = prev + 1
      setMaxStepReached((max) => Math.max(max, next))
      return next
    })
  }, [])

  const previousStep = React.useCallback(() => {
    setCurrentStepState((prev) => Math.max(0, prev - 1))
  }, [])

  return (
    <OnboardingContext.Provider
      value={{ currentStep, maxStepReached, setCurrentStep, data, updateData, nextStep, previousStep }}
    >
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboarding must be used within OnboardingProvider')
  }
  return context
}



