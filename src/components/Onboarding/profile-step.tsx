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
import { ArrowLeft, ArrowRight, X, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const tagOptions = [
  'produktledelse',
  'IP',
  'pitchtrӕning',
  'Marketing',
  'Sales',
  'Product Development',
  'Technology',
  'Finance',
]

export const ProfileStep: React.FC = () => {
  const { data, updateData, nextStep, previousStep } = useOnboarding()
  const [formData, setFormData] = React.useState({
    nickname: data.nickname || '',
    bio: data.bio || '',
    tags: data.tags || [],
  })

  const [currentTag, setCurrentTag] = React.useState('')

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      setFormData({ ...formData, tags: [...formData.tags, tag] })
      setCurrentTag('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateData(formData)
    nextStep()
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Your Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex gap-6 items-start">
          <div className="flex flex-col items-center gap-2">
            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
            <button type="button" className="text-sm text-blue-600 hover:underline">
              Click to edit
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              placeholder="Johnny"
              value={formData.nickname}
              onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            />
            <p className="text-xs text-gray-500">elit est tempor eid ea deserunt</p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            id="bio"
            placeholder="Enter some interesting facts about yourself"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={6}
          />
          <p className="text-xs text-gray-500">
            quis commodo ut amet nostrud fugiat cilium laboris anim amet
          </p>
        </div>

        <div className="space-y-2">
          <Label>Tags</Label>
          <Select value={currentTag} onValueChange={(value) => addTag(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Choose your expertise" />
            </SelectTrigger>
            <SelectContent>
              {tagOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="gap-1">
                {tag}
                <X className="w-3 h-3 cursor-pointer" onClick={() => removeTag(tag)} />
              </Badge>
            ))}
          </div>
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


