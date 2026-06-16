---
name: 'ui-ux-pro-max'
description: 'Provides professional UI/UX design guidelines and best practices for modern web applications. Invoke when redesigning UI, improving user experience, or creating beautiful interfaces.'
---

# UI/UX Pro Max

Professional UI/UX design guidelines and best practices for modern web applications.

## Core Principles

### 1. Visual Hierarchy

- Use clear typography scales
- Establish proper contrast ratios
- Maintain consistent spacing (8px grid system)
- Emphasize important elements through size, color, and position

### 2. Layout & Spacing

- Use a consistent spacing system (4px, 8px, 16px, 24px, 32px, 48px, 64px)
- Ensure adequate whitespace
- Implement responsive design breakpoints
- Maintain visual balance and alignment

### 3. Color System

- Primary colors (max 3 main colors)
- Neutral colors (gray scale)
- Semantic colors (success, warning, error)
- Accessible color contrast (WCAG AA or AAA)
- Smooth gradients and subtle shadows

### 4. Typography

- Hierarchical font sizes
- Consistent line heights and letter spacing
- Proper font weights
- Clear readable text

### 5. Interactions

- Smooth transitions (200-300ms)
- Hover states and feedback
- Loading states
- Disabled states
- Micro-animations

### 6. Accessibility

- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus states
- Proper contrast ratios

## Component Design Guidelines

### Chat Interfaces

- Distinct user/assistant message bubbles
- Clear timestamps
- Avatar design
- Typing indicators
- Scroll behavior

### Input Fields

- Clear placeholder text
- Focus states with outline
- Disabled/loading states
- Proper padding and sizing

### Buttons

- Primary vs secondary actions
- Consistent padding and sizing
- Hover/active states
- Loading indicators

## Modern Design Trends

- Glassmorphism (when appropriate)
- Soft shadows and rounded corners
- Subtle gradients
- Smooth animations
- Dark/light mode support

## UnoCSS Utility Classes (Recommended)

### Spacing

```
p-4, px-4, py-4, m-4, mx-4, my-4
gap-2, gap-4, gap-6
```

### Layout

```
flex, flex-col, items-center, justify-between
w-full, max-w-4xl, mx-auto
```

### Colors

```
bg-white, bg-gray-50, bg-gray-100
text-gray-800, text-gray-600, text-gray-500
border-gray-200, border-gray-300
```

### Effects

```
rounded-lg, rounded-xl, rounded-full
shadow-sm, shadow-md, shadow-lg
hover:shadow-lg
transition-all, duration-200
```
