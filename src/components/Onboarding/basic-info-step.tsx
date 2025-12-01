'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const countries = [
  'Denmark',
  'Sweden',
  'Norway',
  'Finland',
  'Germany',
  'United Kingdom',
  'United States',
]

export const BasicInfoStep: React.FC = () => {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = React.useState({
    firstName: data.firstName || '',
    lastName: data.lastName || '',
    email: data.email || '',
    country: data.country || '',
    password: data.password || '',
    confirmPassword: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    updateData({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      country: formData.country,
      password: formData.password,
    })
    nextStep()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Registration</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              placeholder="John"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              required
            />
            <p className="text-xs text-gray-500">Please enter your full name</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Surname</Label>
            <Input
              id="lastName"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="johndoe@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">Please enter your email address</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Denmark" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">Please enter your place of residence</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="**************"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">Please enter a password</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Repeat password</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="**************"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">Please repeat your password</p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Button type="button" variant="outline" onClick={previousStep}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous step
          </Button>
          <Button type="submit">
            Next step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  )
}

