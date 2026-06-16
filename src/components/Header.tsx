import React from 'react'
import { Flex, Heading, Box } from '@radix-ui/themes'
import { ChatBubbleIcon } from '@radix-ui/react-icons'

export function Header() {
  return (
    <header className="h-16 px-4 border-b border-gray-200 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <Box style={{ maxWidth: '880px', margin: '0 auto', width: '100%' }}>
        <Flex align="center" gap="3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
            <ChatBubbleIcon className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <Heading
              size="5"
              className="font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
            >
              AI Chat
            </Heading>
            <span className="text-xs text-gray-500">Start your conversation</span>
          </div>
        </Flex>
      </Box>
    </header>
  )
}
