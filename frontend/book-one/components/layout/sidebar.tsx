import React from 'react';

interface SidebarProps{
    className: string;
    children: React.ReactNode;
}

export default function Sidebar({ className, children }: SidebarProps) {
    return (
        <div className={`${className} col-span-1 overflow-y-auto`}>
            <div className='flex-1 pt-4'>
                {children}
            </div>
        </div>
    );

};