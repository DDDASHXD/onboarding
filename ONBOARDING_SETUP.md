# Onboarding Flow Setup Guide

This guide explains how to set up and use the multi-step onboarding flow.

## Overview

The onboarding flow consists of 6 steps:
1. **Introduction** - Welcome screen with overview
2. **Basic Info** - User registration (name, email, country, password)
3. **Role Selection** - Choose from Founder, Investor, Mentor, or Student
4. **Role Specifications** - Role-specific forms
5. **Your Profile** - Profile customization (nickname, bio, tags)
6. **Summary** - Review and submit

## Collections Created

### 1. `onboarding-roles`
Defines available roles that users can select during onboarding.

**Fields:**
- `name` - Display name of the role
- `slug` - Unique identifier (founder, investor, mentor, student)
- `description` - Description shown to users
- `image` - Optional role image
- `active` - Whether the role is available for selection

### 2. `user-submissions`
Stores submitted onboarding data from users.

**Fields:**
- Basic info: firstName, lastName, email, country
- Role reference
- Founder fields: companyName, companyDescription, primaryFocus, lookingFor, etc.
- Mentor fields: expertise, branch, jobTitle, accessibility, preferredLanguage
- Investor fields: jobTitle, readyToInvest, expertise
- Profile fields: nickname, bio, tags, profileImage

## Initial Setup

### Step 1: Seed Roles

You need to create the initial roles in your Payload CMS admin panel:

1. Start your development server
2. Navigate to `/admin`
3. Go to "Onboarding Roles" collection
4. Create the following roles:

**Founder:**
- Name: `Founder`
- Slug: `founder`
- Description: `Get matched with mentors and startups that align with your interest and skills, and find projects, internships or sparring to grow your startup.`
- Active: `true`

**Investor:**
- Name: `Investor`
- Slug: `investor`
- Description: `Find and connect with startups that align with your investment plan. Discover new opportunities to support.`
- Active: `true`

**Mentor:**
- Name: `Mentor`
- Slug: `mentor`
- Description: `Get matched with startups and talent, by sharing your expertise to help guide them with strategy, skill development and ideas for their project.`
- Active: `true`

**Student:**
- Name: `Studerende`
- Slug: `student`
- Description: `Bliv matchet med mentorer og startups ud fra dine interesser og kompetencer, og find projekter, praktik eller sparring.`
- Active: `true`

Alternatively, you can use the seed data in `seed-onboarding-roles.json`.

### Step 2: Access the Onboarding Flow

Navigate to `/onboarding` in your browser to access the onboarding flow.

## API Routes

### GET `/api/onboarding/roles`
Fetches all active roles for the role selection step.

**Response:**
```json
{
  "success": true,
  "roles": [...]
}
```

### POST `/api/onboarding/submit`
Submits the completed onboarding data.

**Request Body:**
All fields from the onboarding context (OnboardingData interface)

**Response:**
```json
{
  "success": true,
  "submission": {...}
}
```

## Components Structure

```
src/components/Onboarding/
├── onboarding-context.tsx      # React Context for managing form state
├── step-indicator.tsx           # Progress indicator at top
├── introduction-step.tsx        # Step 1: Welcome screen
├── basic-info-step.tsx         # Step 2: Registration form
├── role-selection-step.tsx     # Step 3: Role selection
├── role-specifications-step.tsx # Step 4: Router for role-specific forms
├── founder-specifications.tsx   # Founder-specific form
├── mentor-specifications.tsx    # Mentor-specific form
├── investor-specifications.tsx  # Investor-specific form
├── profile-step.tsx            # Step 5: Profile customization
└── summary-step.tsx            # Step 6: Summary and submission
```

## Customization

### Adding a New Role

1. Create the role in Payload CMS
2. Create a new specifications component (e.g., `partner-specifications.tsx`)
3. Update `role-specifications-step.tsx` to include the new role:

```tsx
case 'partner':
  return <PartnerSpecifications />
```

4. Add necessary fields to the `UserSubmissions` collection
5. Update the `OnboardingData` interface in `onboarding-context.tsx`

### Styling

The components use Tailwind CSS and shadcn/ui components. Modify the className props to customize the appearance.

### Form Validation

Currently using basic HTML5 validation. You can enhance this with:
- React Hook Form
- Zod schema validation
- Custom validation logic

## Production Considerations

1. **Password Handling**: The current implementation stores passwords in plain text. Implement proper hashing before production.
2. **Email Verification**: Add email verification flow
3. **Error Handling**: Enhance error messages and validation
4. **Loading States**: Add better loading indicators
5. **Analytics**: Track step completion rates
6. **A/B Testing**: Test different flows and copy

## Troubleshooting

**Roles not loading:**
- Ensure roles are created in the admin panel
- Check browser console for API errors
- Verify the `/api/onboarding/roles` endpoint is accessible

**Submission fails:**
- Check Payload CMS connection
- Verify all required fields are present
- Check server logs for detailed errors

**TypeScript errors:**
- Run `pnpm payload generate:types` to regenerate Payload types
- Ensure all imports are correct

## Next Steps

1. Add image upload for profile pictures
2. Implement role-based dashboards post-onboarding
3. Add email notifications for new submissions
4. Create admin review workflow for submissions
5. Add multi-language support

