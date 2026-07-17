import React from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  charClassName?: string;
  wordClassName?: string;
  type?: 'chars' | 'words';
}

export function SplitText({ text, className, charClassName = 'char', wordClassName = 'word', type = 'chars' }: SplitTextProps) {
  if (type === 'words') {
    const words = text.split(' ');
    return (
      <span className={className}>
        {words.map((word, index) => (
          <span key={index} className={`inline-block ${wordClassName}`}>
            {word}&nbsp;
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`inline-block ${charClassName}`}
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
