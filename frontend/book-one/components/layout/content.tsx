import React from 'react';

interface ContentProps {
  className: string;
  children: React.ReactNode;
}

export default function Content({ className, children }: ContentProps) {
    return (
        <div className={`${className} flex flex-col h-screen`}>
            {children}
        </div>
    );

};