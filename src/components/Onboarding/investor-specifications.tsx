'use client'

import React from 'react'
import { useOnboarding } from './onboarding-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, ArrowRight, X, Info } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const expertiseOptions = [
  'produktledelse',
  'IP',
  'pitchtrӕning',
  'Marketing',
  'Sales',
  'Product Development',
  'Technology',
  'Finance',
]

export const InvestorSpecifications: React.FC = () => {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = React.useState({
    jobTitle: data.jobTitle || '',
    readyToInvest: data.readyToInvest || false,
    expertise: data.expertise || [],
  })

  const [currentExpertise, setCurrentExpertise] = React.useState('')

  const addExpertise = (skill: string) => {
    if (skill && !formData.expertise.includes(skill)) {
      setFormData({ ...formData, expertise: [...formData.expertise, skill] })
      setCurrentExpertise('')
    }
  }

  const removeExpertise = (skill: string) => {
    setFormData({
      ...formData,
      expertise: formData.expertise.filter((e) => e !== skill),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateData(formData)
    nextStep()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Investor</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="jobTitle">Jobtitle</Label>
          <Input
            id="jobTitle"
            placeholder="Developer... etc."
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          />
          <p className="text-xs text-gray-500">Please enter your current job title</p>
        </div>

        <div className="bg-gray-50 border rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Checkbox
              id="readyToInvest"
              checked={formData.readyToInvest}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, readyToInvest: checked as boolean })
              }
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="readyToInvest" className="font-semibold cursor-pointer">
                  Ready to invest
                </Label>
                <Info className="w-4 h-4 text-gray-500" />
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Enable this section, if you are searching for an investment opportunity.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Ekspertise</Label>
          <Select value={currentExpertise} onValueChange={(value) => addExpertise(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your expertize" />
            </SelectTrigger>
            <SelectContent>
              {expertiseOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.expertise.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1">
                {skill}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeExpertise(skill)} />
              </Badge>
            ))}
          </div>
          <p className="text-xs text-gray-500">Please type any of your expertise</p>
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


