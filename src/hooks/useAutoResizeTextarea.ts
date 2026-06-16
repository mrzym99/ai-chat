import { useRef, useEffect } from 'react';

export function useAutoResizeTextarea(value: string, maxHeight: number = 150) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = Math.min(ref.current.scrollHeight, maxHeight) + 'px';
    }
  }, [value, maxHeight]);

  return ref;
}
