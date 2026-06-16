import React from 'react'
import { type Message } from '../types'
import { formatTime } from '../utils/format'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatMessageProps {
  role: Message['role']
  content: string
  timestamp?: Date
  avatar?: string
  generating?: boolean
}

function Avatar({ role, avatar, generating }: { role: Message['role']; avatar?: string; generating?: boolean }) {
  const isUser = role === 'user'

  return (
    <div
      className={`
      w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm
      ${isUser ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-gray-100 to-gray-200'}
      ${generating && !isUser ? 'animate-bounce' : ''}
    `}
      style={{ animationDuration: generating && !isUser ? '0.6s' : undefined }}
    >
      {avatar ? (
        <img src={avatar} alt="avatar" className="w-full h-full rounded-2xl object-cover" />
      ) : (
        <span className={`text-sm font-medium ${isUser ? 'text-white' : 'text-gray-600'}`}>{isUser ? '你' : 'AI'}</span>
      )}
    </div>
  )
}

function MessageBubble({ role, content }: { role: Message['role']; content: string }) {
  const isUser = role === 'user'

  return (
    <div
      className={`
      px-5 py-3 rounded-2xl shadow-sm max-w-[85%] leading-relaxed
      ${
        isUser
          ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-md shadow-blue-200'
          : 'bg-white text-gray-800 rounded-tl-md border border-gray-100 shadow-gray-100'
      }
    `}
    >
      {isUser ? (
        <p className="whitespace-pre-wrap text-[15px]">{content}</p>
      ) : (
        <div className="text-[15px]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
            h1: ({ children }) => <h1 className="text-lg font-bold mt-2 mb-1">{children}</h1>,
            h2: ({ children }) => <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>,
            h3: ({ children }) => <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>,
            code: ({ className, children }) => (
              <code
                className={`${className || ''} px-1.5 py-0.5 rounded text-sm font-mono bg-gray-100 text-gray-800`}
              >
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="px-3 py-2 rounded-lg bg-gray-800 text-gray-100 text-sm font-mono overflow-x-auto my-2">
                {children}
              </pre>
            ),
            ul: ({ children }) => <ul className="list-disc space-y-1">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal space-y-1">{children}</ol>,
            li: ({ children }) => <li className="text-[15px]">{children}</li>,
            p: ({ children }) => <p className="whitespace-pre-wrap text-[15px] leading-relaxed">{children}</p>,
            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
            em: ({ children }) => <em className="italic">{children}</em>,
            blockquote: ({ children }) => (
              <blockquote className="border-l-2 border-blue-400 pl-3 italic text-gray-600 my-2">
                {children}
              </blockquote>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto my-2">
                <table className="border-collapse w-full text-sm">
                  {children}
                </table>
              </div>
            ),
            th: ({ children }) => (
              <th className="border border-gray-200 px-3 py-2 bg-gray-50 font-semibold text-left">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-200 px-3 py-2">
                {children}
              </td>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
        </div>
      )}
    </div>
  )
}

function TimeStamp({ time }: { time: Date }) {
  return <span className="text-xs text-gray-400 mt-1.5 px-2">{formatTime(time)}</span>
}

export function ChatMessage({ role, content, timestamp, avatar, generating }: ChatMessageProps) {
  const isUser = role === 'user'

  return (
    <div className={`flex w-full my-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`w-full flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <Avatar role={role} avatar={avatar} generating={generating} />
        <div className={`w-full flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <MessageBubble role={role} content={content} />
          {timestamp && <TimeStamp time={timestamp} />}
        </div>
      </div>
    </div>
  )
}
