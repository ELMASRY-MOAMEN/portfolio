'use client';

import React, { useState, useEffect, useRef } from 'react';

interface TypeWriterProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayAfterType?: number;
  delayAfterDelete?: number;
  className?: string;
  cursorClassName?: string;
  hideCursorOnComplete?: boolean;
  loop?: boolean;
  onComplete?: () => void;
}

export default function TypeWriter({
  texts,
  typingSpeed = 80,
  deletingSpeed = 50,
  delayAfterType = 1500,
  delayAfterDelete = 500,
  className = "text-primary",
  cursorClassName = "border-r-2 border-primary animate-blink",
  hideCursorOnComplete = false,
  loop = true,
  onComplete,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isComplete) return;

    // Clear timeout when component unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isComplete]);

  useEffect(() => {
    if (isComplete) return;

    const currentText = texts[currentIndex];
    
    if (isTyping && !isDeleting) {
      // Still typing the current text
      if (displayText.length < currentText.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, typingSpeed);
      } 
      // Finished typing
      else {
        setIsTyping(false);
        timeoutRef.current = setTimeout(() => {
          // If we're looping or not on the last item, prepare to delete
          if (loop || currentIndex < texts.length - 1) {
            setIsDeleting(true);
          } else {
            setIsComplete(true);
            if (onComplete) onComplete();
          }
        }, delayAfterType);
      }
    } 
    // Deleting the current text
    else if (isDeleting) {
      if (displayText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
      } 
      // Finished deleting
      else {
        setIsDeleting(false);
        timeoutRef.current = setTimeout(() => {
          // Move to next text or loop back to first
          const nextIndex = (currentIndex + 1) % texts.length;
          setCurrentIndex(nextIndex);
          setIsTyping(true);
        }, delayAfterDelete);
      }
    }
  }, [
    displayText, 
    isTyping, 
    isDeleting, 
    currentIndex, 
    texts, 
    typingSpeed, 
    deletingSpeed, 
    delayAfterType, 
    delayAfterDelete, 
    loop, 
    isComplete, 
    onComplete
  ]);

  return (
    <span className="relative inline-flex">
      <span className={className}>{displayText}</span>
      {(!isComplete || !hideCursorOnComplete) && (
        <span className={`${cursorClassName} inline-block ml-1 h-full`}>&nbsp;</span>
      )}
    </span>
  );
} 