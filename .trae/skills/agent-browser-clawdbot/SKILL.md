---
name: "agent-browser-clawdbot"
description: "Specializes in browser-based debugging, UI layout fixing, and resolving visual rendering issues. Invoke when dealing with layout anomalies, CSS problems, or browser rendering discrepancies."
---

# Agent Browser Clawdbot

A specialized skill for debugging and fixing browser UI/UX issues, layout anomalies, and CSS rendering problems.

## Core Focus Areas

### 1. Layout Debugging
- Identify and fix overflow issues
- Resolve unexpected scrollbars
- Fix flexbox/grid layout problems
- Handle position absolute/fixed issues
- Resolve z-index stacking context problems

### 2. CSS Issues Resolution
- Fix border and outline problems
- Resolve focus state styling
- Fix color contrast issues
- Handle browser-specific rendering discrepancies
- Debug box model problems (margin, padding, border)

### 3. Browser Compatibility
- Cross-browser rendering consistency
- Default browser styles conflicts
- User-agent stylesheet issues
- Reset/Normalize CSS best practices

### 4. Common UI Problems
- Textarea default borders
- Input focus states
- Unexpected outlines
- Scrollbar styling
- Responsive breakpoints issues

## Debugging Workflow

### Step 1: Identify the Issue
- Examine the problematic component
- Check browser dev tools for applied styles
- Identify conflicting CSS rules
- Look for default browser styles interfering

### Step 2: Apply Fixes
- Reset default styles with `outline: none` or `border: none`
- Use consistent box-sizing (`box-sizing: border-box`)
- Apply proper focus states (accessibility first!)
- Fix overflow and scroll issues

### Step 3: Verify & Test
- Check all states (default, hover, focus, active, disabled)
- Test across different viewport sizes
- Ensure accessibility is maintained

## Quick Fixes Cheatsheet

### Remove Default Borders
```css
/* For inputs and textareas */
border: none;
outline: none;
/* OR */
border: 0;
```

### Custom Focus State
```css
/* Accessible focus state */
focus:outline-none;
focus:ring-2;
focus:ring-blue-500;
```

### Prevent Scroll Issues
```css
overflow: hidden;
overflow-y: auto;
overflow-x: hidden;
```

### Box Sizing
```css
box-sizing: border-box;
```

## Common Problems & Solutions

### Problem: Input has black border
**Solution:** Remove default border and outline, add custom focus state

### Problem: Unexpected scrollbars
**Solution:** Check overflow properties, ensure container has proper dimensions

### Problem: Layout breaks on resize
**Solution:** Use responsive units (%, vh, vw, rem) and media queries
