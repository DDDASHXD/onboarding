import type { CollectionConfig } from 'payload'

export const UserSubmissions: CollectionConfig = {
  slug: 'user-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['firstName', 'lastName', 'email', 'role', 'createdAt'],
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    // Basic Info
    {
      name: 'firstName',
      type: 'text',
      required: true,
      label: 'First Name',
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      label: 'Last Name',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'country',
      type: 'text',
      required: false,
      label: 'Country',
    },
    {
      name: 'role',
      type: 'relationship',
      relationTo: 'onboarding-roles',
      required: true,
      label: 'Selected Role',
    },

    // Founder specific fields
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      admin: {
        condition: (data) => {
          // This will be checked on the frontend
          return true
        },
      },
    },
    {
      name: 'companyDescription',
      type: 'textarea',
      label: 'Short Description',
    },
    {
      name: 'primaryFocus',
      type: 'array',
      label: 'Primary Focus',
      fields: [
        {
          name: 'focus',
          type: 'text',
        },
      ],
    },
    {
      name: 'lookingFor',
      type: 'array',
      label: 'What are you looking for?',
      fields: [
        {
          name: 'item',
          type: 'text',
        },
      ],
    },
    {
      name: 'primaryContactPerson',
      type: 'text',
      label: 'Primary Contact Person',
    },
    {
      name: 'contactEmail',
      type: 'email',
      label: 'Contact Email',
    },
    {
      name: 'companyPhone',
      type: 'text',
      label: 'Company Phone Number',
    },

    // Mentor specific fields
    {
      name: 'expertise',
      type: 'array',
      label: 'Expertise',
      fields: [
        {
          name: 'skill',
          type: 'text',
        },
      ],
    },
    {
      name: 'branch',
      type: 'text',
      label: 'Branch/Industry',
    },
    {
      name: 'jobTitle',
      type: 'text',
      label: 'Job Title/Role',
    },
    {
      name: 'accessibility',
      type: 'text',
      label: 'Accessibility',
    },
    {
      name: 'preferredLanguage',
      type: 'text',
      label: 'Preferred Language',
    },

    // Investor specific fields
    {
      name: 'readyToInvest',
      type: 'checkbox',
      label: 'Ready to Invest',
    },

    // Profile fields
    {
      name: 'nickname',
      type: 'text',
      label: 'Nickname',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
        },
      ],
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Image',
    },
  ],
}

