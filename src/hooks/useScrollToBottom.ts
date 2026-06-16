import { useRef, useEffect, useState, useCallback, useLayoutEffect } from 'react';

export function useScrollToBottom(deps: unknown[] = []) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const skipNextScroll = useRef(false);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'smooth') => {
    if (scrollRef.current && !skipNextScroll.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior,
      });
    }
    skipNextScroll.current = false;
  }, []);

  useLayoutEffect(() => {
    if (isAtBottom) {
      scrollToBottom('smooth');
    }
  }, [...deps, isAtBottom, scrollToBottom]);

  useEffect(() => {
    scrollToBottom('instant');
  }, [scrollToBottom]);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const threshold = 50;
    const bottom = scrollHeight - scrollTop - clientHeight <= threshold;
    
    if (!bottom && isAtBottom) {
      skipNextScroll.current = true;
    }
    setIsAtBottom(bottom);
  }, [isAtBottom]);

  return {
    scrollRef,
    scrollToBottom,
    handleScroll,
  };
}
