import React from 'react'
import { Header } from './components/Header'
import { ChatContainer } from './components/ChatContainer'
import { ChatInput } from './components/ChatInput'
import { ErrorToast } from './components/common/ErrorToast'
import { useChat } from './hooks/useChat'

export default function App() {
  const { messages, isLoading, error, sendMessage, stopMessage, clearError } = useChat()

  return (
    <div className="h-screen overflow-hidden flex flex-col bg-gray-50">
      <Header />
      <ChatContainer messages={messages} loading={isLoading} />
      <ChatInput onSend={sendMessage} onStop={stopMessage} loading={isLoading} disabled={isLoading} />
      {error && <ErrorToast message={error} onClose={clearError} />}
    </div>
  )
}
