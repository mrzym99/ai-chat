import { useState, useRef, useCallback } from 'react';
import { callChatAPI } from '../api';
import type { Message } from '../types';
import { prepareContextMessages } from '../utils/messageCompression';
import { MAX_CONTEXT_MESSAGES } from '../constants';

function getMaxContextMessages(messages: Message[]) {
  return messages.slice(-MAX_CONTEXT_MESSAGES);
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [summaries, setSummaries] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);
    setError(null);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      const allMessages = [...messages, userMessage]
      const { compressed, summaryMessage } = await prepareContextMessages(allMessages);
      const sendMessages = []
      if (compressed) {
        setSummaries((prev) => [...prev, summaryMessage]);
        setMessages((prev) => prev.map(msg => ({
          ...msg,
          compressed: true
        })));
        sendMessages.push(...summaries, summaryMessage)
      } else {
        sendMessages.push(...summaries, ...allMessages.filter((msg) => !msg.compressed && msg.role !== 'system'))
      }
      const stream = callChatAPI(getMaxContextMessages(sendMessages), abortController);
      let fullContent = '';

      for await (const chunk of stream) {
        fullContent += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: fullContent } : msg
          )
        );
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error(e);
        setError('发送消息失败，请重试');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [messages, isLoading]);

  const stopMessage = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    stopMessage,
    clearError,
  };
}
