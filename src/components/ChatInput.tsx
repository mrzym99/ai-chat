import React, { useState, useCallback, useRef, useEffect } from 'react'
import { Button, Flex, Box } from '@radix-ui/themes'
import { PaperPlaneIcon, StopIcon } from '@radix-ui/react-icons'
import { LoadingSpinner } from './common/LoadingSpinner'

interface ChatInputProps {
  onSend: (content: string) => void
  onStop?: () => void
  loading?: boolean
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  onStop,
  loading = false,
  disabled = false,
  placeholder = '输入消息...',
}: ChatInputProps) {
  const [inputValue, setInputValue] = useState('')
  const [textareaHeight, setTextareaHeight] = useState(68)
  const [isDragging, setIsDragging] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const startY = useRef(0)
  const startHeight = useRef(0)

  const minHeight = 68
  const maxHeight = 300

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = textareaHeight + 'px'
    }
  }, [textareaHeight])

  useEffect(() => {
    if (!isDragging && textareaRef.current) {
      const scrollHeight = textareaRef.current.scrollHeight
      if (scrollHeight > minHeight && scrollHeight <= maxHeight) {
        setTextareaHeight(scrollHeight)
      }
    }
  }, [inputValue, isDragging])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    startY.current = e.clientY
    startHeight.current = textareaHeight
  }, [textareaHeight])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return

    const deltaY = startY.current - e.clientY
    const newHeight = startHeight.current + deltaY
    const clampedHeight = Math.max(minHeight, Math.min(maxHeight, newHeight))
    setTextareaHeight(clampedHeight)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = 'ns-resize'
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.body.style.cursor = ''
    }
  }, [isDragging, handleMouseMove, handleMouseUp])

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      setInputValue(inputValue.substring(0, start) + '\n' + inputValue.substring(end))
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 1
      }, 0)
    }
  }, [inputValue])

  const handleSend = useCallback(() => {
    if (loading || disabled || !inputValue.trim()) return

    onSend(inputValue)
    setInputValue('')
    setTextareaHeight(minHeight)
  }, [loading, disabled, inputValue, onSend])

  const handleStop = useCallback(() => {
    onStop?.()
  }, [onStop])

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border-t border-gray-200 p-4 shadow-lg -mt-1">
      <Box style={{ maxWidth: '880px', margin: '0 auto' }}>
        <div className="flex-1 relative bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-200">
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || disabled}
            placeholder={placeholder}
            className="w-full resize-none bg-transparent border-0 px-4 pr-14 py-4 text-[15px] text-gray-800 placeholder-gray-400 
                   outline-none focus:outline-none focus:ring-0
                   disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
          />
          <div className="absolute right-2 bottom-2 flex items-end">
            {loading && onStop ? (
              <Button
                color="tomato"
                size="3"
                className="px-4 h-10 rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                onClick={handleStop}
              >
                <StopIcon className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                color="blue"
                size="3"
                className="px-4 h-10 rounded-xl shadow-md shadow-blue-200 hover:shadow-lg hover:shadow-blue-200 transition-all duration-200"
                onClick={handleSend}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSend()
                  }
                }}
                disabled={loading || disabled || !inputValue.trim()}
                tabIndex={0}
              >
                {loading ? <LoadingSpinner /> : <PaperPlaneIcon className="w-4 h-4" />}
              </Button>
            )}
          </div>
          <div
            className="absolute top-0 left-0 right-0 h-2 cursor-ns-resize hover:bg-gray-200/50 transition-colors flex items-center justify-center"
            onMouseDown={handleMouseDown}
          >
            <div className="w-8 h-0.5 bg-gray-300 rounded-full" />
          </div>
        </div>
      </Box>
    </div>
  )
}