'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const focusOptions = ['AI', 'Cirkulær ekonomi', 'B2B', 'B2C', 'SaaS', 'Hardware', 'Green Energy']
const lookingForOptions = [
  'Mentorship',
  'Funding',
  'Co-founder',
  'Advisors',
  'Partnerships',
  'Talent',
]

export const FounderSpecifications: React.FC = () => {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = React.useState({
    companyName: data.companyName || '',
    companyDescription: data.companyDescription || '',
    primaryFocus: data.primaryFocus || [],
    lookingFor: data.lookingFor || [],
    primaryContactPerson: data.primaryContactPerson || '',
    contactEmail: data.contactEmail || '',
    companyPhone: data.companyPhone || '',
  })

  const [currentFocus, setCurrentFocus] = React.useState('')
  const [currentLookingFor, setCurrentLookingFor] = React.useState('')

  const addFocus = (focus: string) => {
    if (focus && !formData.primaryFocus.includes(focus)) {
      setFormData({ ...formData, primaryFocus: [...formData.primaryFocus, focus] })
      setCurrentFocus('')
    }
  }

  const removeFocus = (focus: string) => {
    setFormData({
      ...formData,
      primaryFocus: formData.primaryFocus.filter((f) => f !== focus),
    })
  }

  const addLookingFor = (item: string) => {
    if (item && !formData.lookingFor.includes(item)) {
      setFormData({ ...formData, lookingFor: [...formData.lookingFor, item] })
      setCurrentLookingFor('')
    }
  }

  const removeLookingFor = (item: string) => {
    setFormData({
      ...formData,
      lookingFor: formData.lookingFor.filter((i) => i !== item),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateData(formData)
    nextStep()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Founder</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Name of the company</Label>
          <Input
            id="companyName"
            placeholder="The name of your company"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyDescription">Short description</Label>
          <Textarea
            id="companyDescription"
            placeholder="Write a short description of what your company does."
            value={formData.companyDescription}
            onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
            rows={4}
            maxLength={200}
          />
          <p className="text-xs text-gray-500">{formData.companyDescription.length}/200 characters</p>
        </div>

        <div className="space-y-2">
          <Label>Primary focus</Label>
          <Select value={currentFocus} onValueChange={(value) => addFocus(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose focus points" />
            </SelectTrigger>
            <SelectContent>
              {focusOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.primaryFocus.map((focus) => (
              <Badge key={focus} variant="secondary" className="gap-1">
                {focus}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeFocus(focus)} />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>What are you looking for?</Label>
          <Select value={currentLookingFor} onValueChange={(value) => addLookingFor(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select the targets that best suit your needs." />
            </SelectTrigger>
            <SelectContent>
              {lookingForOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.lookingFor.map((item) => (
              <Badge key={item} variant="secondary" className="gap-1">
                {item}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeLookingFor(item)} />
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="primaryContactPerson">Primary contact person</Label>
          <Select
            value={formData.primaryContactPerson}
            onValueChange={(value) => setFormData({ ...formData, primaryContactPerson: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Name of the person handling inquiries" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="founder">Founder</SelectItem>
              <SelectItem value="ceo">CEO</SelectItem>
              <SelectItem value="cto">CTO</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            Write the name of the primary contact person in your company
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactEmail">E-mail for contact</Label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="hello@senpage.dev, etc."
            value={formData.contactEmail}
            onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
          />
          <p className="text-xs text-gray-500">Please enter the company email address</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyPhone">Company phone number</Label>
          <div className="flex gap-2">
            <Select defaultValue="+45">
              <SelectTrigger className="w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="+45">+45</SelectItem>
                <SelectItem value="+46">+46</SelectItem>
                <SelectItem value="+47">+47</SelectItem>
                <SelectItem value="+1">+1</SelectItem>
                <SelectItem value="+44">+44</SelectItem>
              </SelectContent>
            </Select>
            <Input
              id="companyPhone"
              placeholder="Phone number"
              value={formData.companyPhone}
              onChange={(e) => setFormData({ ...formData, companyPhone: e.target.value })}
              className="flex-1"
            />
          </div>
          <p className="text-xs text-gray-500">Please enter the company phone number</p>
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

