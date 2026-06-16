import React from 'react'
import { type Message } from '../types'
import { ChatMessage } from './ChatMessage'
import { Box, Heading, Text, Flex } from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { useScrollToBottom } from '../hooks/useScrollToBottom'

interface ChatContainerProps {
  messages: Message[]
  className?: string
  loading?: boolean
}

function EmptyState() {
  return (
    <Flex direction="column" align="center" justify="center" className="h-full min-h-[500px] w-full">
      <Box className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex! items-center justify-center mb-6 shadow-lg shadow-blue-100">
        <ChatBubbleIcon className="w-12 h-12 text-blue-500 flex-shrink-0" />
      </Box>
      <Heading size="4" mb="2" className="text-gray-800 font-semibold">
        开始对话
      </Heading>
      <Text color="gray" align="center" className="max-w-xs leading-relaxed">
        发送你的第一条消息，开始与 AI 助手的智能对话体验
      </Text>
    </Flex>
  )
}

export function ChatContainer({ messages, className = '', loading = false }: ChatContainerProps) {
  const { scrollRef, handleScroll } = useScrollToBottom([messages])

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className={`flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white ${className}`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <Box style={{ maxWidth: '880px', margin: '0 auto', width: '100%', minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <Flex direction="column" gap="6" width="100%">
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                timestamp={message.timestamp}
                generating={loading && index === messages.length - 1 && message.role === 'assistant'}
              />
            ))}
          </Flex>
        )}
      </Box>
    </div>
  )
}
