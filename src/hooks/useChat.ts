import { useState, useRef, useCallback } from 'react';
import { callChatAPI } from '../api';
import type { Message } from '../types';
import { prepareContextMessages } from '../utils/messageCompression';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [summary, setSummary] = useState<Message | undefined>(undefined);
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
      const { compressed, summaryMessage } = await prepareContextMessages(messages, summary);
      const sendMessages = []
      if (compressed) {
        setSummary(summaryMessage);
        setMessages((prev) => prev.map(msg => ({
          ...msg,
          compressed: true
        })));
        sendMessages.push(summaryMessage, userMessage)
      } else {
        if(summary?.content) {
          sendMessages.push(summary);
        }
        sendMessages.push(...messages.filter((msg) => !msg.compressed), userMessage)
      }
      const stream = callChatAPI(sendMessages, abortController);
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
