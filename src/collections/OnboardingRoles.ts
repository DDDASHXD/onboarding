import type { CollectionConfig } from 'payload'

export const OnboardingRoles: CollectionConfig = {
  slug: 'onboarding-roles',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'description'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Role Name',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      label: 'Slug',
      admin: {
        description: 'Used to identify the role (e.g., founder, investor, mentor, student)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Role Image',
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
    },
  ],
}

