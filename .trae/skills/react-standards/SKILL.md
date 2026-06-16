---
name: 'react-standards'
description: 'Provides React component patterns, CSS styling guidelines, and architecture best practices. Invoke when starting new React projects, refactoring code, or setting up project standards.'
---

# React Standards & Architecture Guide

This skill provides comprehensive guidelines for React development, including component patterns, CSS/styling standards, and project architecture best practices.

## When to Use

- Starting a new React project
- Refactoring existing React code
- Setting up project coding standards
- Reviewing React component implementation
- Planning project architecture

---

## React Component Standards

### 1. Component Structure

```tsx
// Good: Clear imports, type first, then React, then others
import React, { useState, useRef, useEffect } from 'react'
import { Button, Flex } from '@radix-ui/themes'
import { IconName } from '@radix-ui/react-icons'
import type { SomeType } from '../types'

// Good: Interface first, then component
interface ComponentProps {
  onAction: (value: string) => void
  isLoading?: boolean
  disabled?: boolean
  placeholder?: string
}

export function ComponentName({
  onAction,
  isLoading = false,
  disabled = false,
  placeholder = 'Enter text...',
}: ComponentProps) {
  // State
  const [value, setValue] = useState('')

  // Refs
  const ref = useRef<HTMLDivElement>(null)

  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependency])

  // Event handlers
  const handleAction = () => {
    if (!value.trim() || isLoading) return
    onAction(value)
  }

  // Render
  return <div className="flex gap-2">{/* JSX */}</div>
}
```

### 2. Component Patterns

#### Container/Presenter Pattern

```tsx
// Container - handles data fetching, state
export function UserListContainer() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetchUsers().then(setUsers)
  }, [])

  return <UserList users={users} />
}

// Presenter - pure UI component
export function UserList({ users }: { users: User[] }) {
  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  )
}
```

#### Custom Hook Pattern

```tsx
export function useDebounce<T>(value: T, delay: number = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])

  return debouncedValue
}
```

---

## CSS & Styling Standards

### 1. UnoCSS Conventions

```tsx
// Good: Logical order, consistent naming
<div
  className="
  flex flex-col gap-4
  w-full max-w-4xl mx-auto
  p-4 bg-white rounded-lg shadow-md
  hover:shadow-lg transition-shadow
"
>
  {/* Content */}
</div>
```

### 2. Utility Class Order

1. Layout (flex, grid)
2. Spacing (gap, p, m)
3. Size (w, h)
4. Positioning
5. Background & Borders
6. Text
7. Effects (hover, transition)

---

## Project Architecture

### 1. Directory Structure

```
src/
├── components/       # Reusable UI components
│   ├── Button.tsx
│   ├── Card.tsx
│   └── ...
├── hooks/            # Custom hooks
│   ├── useDebounce.ts
│   └── useFetch.ts
├── types/            # TypeScript types
│   └── index.ts
├── utils/            # Utility functions
│   └── format.ts
├── api/              # API calls
│   └── index.ts
├── App.tsx           # Root component
└── main.tsx          # Entry point
```

### 2. Component Organization

```
components/
├── common/           # Generic, universal components
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Modal.tsx
├── layout/           # Layout-related components
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── features/         # Feature-specific components
    ├── chat/
    │   ├── ChatInput.tsx
    │   └── ChatMessage.tsx
    └── ...
```

---

## Best Practices

### 1. State Management

- Keep state as close to usage as possible
- Lift state up only when necessary
- Use Context for global state sparingly

### 2. Performance

- Use `useMemo` and `useCallback` appropriately
- Avoid unnecessary re-renders
- Virtualize long lists

### 3. TypeScript

- Prefer `type` over `interface` for object types
- Use `unknown` instead of `any`
- Define clear prop interfaces

### 4. Accessibility

- Use semantic HTML
- Add proper ARIA labels
- Ensure keyboard navigation
