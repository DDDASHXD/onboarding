'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/utilities/cn'

interface Role {
  id: string
  name: string
  slug: string
  description: string
  image?: {
    url: string
  }
}

interface RoleSelectionStepProps {
  roles: Role[]
}

export const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({ roles }) => {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [selectedRole, setSelectedRole] = React.useState<string | null>(data.roleId)

  const handleSubmit = () => {
    if (!selectedRole) {
      alert('Please select a role')
      return
    }
    const role = roles.find((r) => r.id === selectedRole)
    updateData({
      roleId: selectedRole,
      roleSlug: role?.slug || null,
    })
    nextStep()
  }

  const currentRole = roles.find((r) => r.id === selectedRole)

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="mb-8 text-center text-3xl font-bold">Role</h2>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              className={cn(
                'cursor-pointer rounded-lg border p-4 transition-all',
                selectedRole === role.id
                  ? 'border-black bg-gray-50'
                  : 'border-gray-200 hover:border-gray-300',
              )}
              onClick={() => setSelectedRole(role.id)}
            >
              <div className="flex items-start gap-3">
                <div
                  className={cn(
                    'mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2',
                    selectedRole === role.id ? 'border-black bg-black' : 'border-gray-300',
                  )}
                >
                  {selectedRole === role.id && (
                    <svg
                      className="h-3 w-3 text-white"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{role.name}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-gray-600">{role.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center rounded-lg bg-gray-50 p-8">
          {currentRole ? (
            <>
              {currentRole.image?.url && (
                <img
                  src={currentRole.image.url}
                  alt={currentRole.name}
                  className="mb-6 aspect-square w-full max-w-md rounded-lg object-cover"
                />
              )}
              <h3 className="mb-3 text-2xl font-bold">{currentRole.name}</h3>
              <p className="text-center text-gray-600">{currentRole.description}</p>
            </>
          ) : (
            <p className="text-gray-500">Select a role to see details</p>
          )}
        </div>
      </div>

      <div className="flex justify-center gap-4 pt-8">
        <Button type="button" variant="outline" onClick={previousStep}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous step
        </Button>
        <Button onClick={handleSubmit}>
          Next step
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
