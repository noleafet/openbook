import React from 'react';

interface SidebarProps{
    className: string;
    children: React.ReactNode;
}

export default function Sidebar({ className, children }: SidebarProps) {
    return (
        <div className={`${className} col-span-1 flex h-screen`}>
            <div className='flex-1 overflow-hidden pt-4'>
                {children}
            </div>
        </div>
    );

};