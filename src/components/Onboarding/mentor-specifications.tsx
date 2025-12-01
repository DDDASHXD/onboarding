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
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

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

export const MentorSpecifications: React.FC = () => {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = React.useState({
    expertise: data.expertise || [],
    branch: data.branch || '',
    jobTitle: data.jobTitle || '',
    accessibility: data.accessibility || '',
    preferredLanguage: data.preferredLanguage || '',
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
      <h2 className="text-3xl font-bold text-center mb-8">Mentor</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label>Ekspertise</Label>
          <Select value={currentExpertise} onValueChange={(value) => addExpertise(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Vælg kompetencer" />
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
          <p className="text-xs text-gray-500">
            quis commodo ut amet nostrud fugiat cilium laboris anim amet
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="branch">Branche</Label>
          <Input
            id="branch"
            placeholder="Specify primary industry, e.g. 'SaaS', 'medical', 'green energy'"
            value={formData.branch}
            onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
          />
          <p className="text-xs text-gray-500">
            quis commodo ut amet nostrud fugiat cilium laboris anim amet
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Jobtitel/rolle</Label>
          <Input
            id="jobTitle"
            placeholder="Your current title/role"
            value={formData.jobTitle}
            onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
          />
          <p className="text-xs text-gray-500">
            quis commodo ut amet nostrud fugiat cilium laboris anim amet
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="accessibility">Accessbility</Label>
          <Input
            id="accessibility"
            placeholder="Approx. hours per month or number of mentees you can take.*"
            value={formData.accessibility}
            onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
          />
          <p className="text-xs text-gray-500">
            quis commodo ut amet nostrud fugiat cilium laboris anim amet
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredLanguage">Preferred language</Label>
          <Select
            value={formData.preferredLanguage}
            onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Danish" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Danish">Danish</SelectItem>
              <SelectItem value="English">English</SelectItem>
              <SelectItem value="Swedish">Swedish</SelectItem>
              <SelectItem value="Norwegian">Norwegian</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500">
            quis commodo ut amet nostrud fugiat cilium laboris anim amet
          </p>
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

