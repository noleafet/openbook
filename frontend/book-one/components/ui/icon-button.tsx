'use client';

import { ReactElement, ComponentPropsWithoutRef } from 'react';

import { IconType } from 'react-icons/lib';
import { Button } from '@/components/ui/button';


interface IconButtonProps<P extends ComponentPropsWithoutRef<IconType> = ComponentPropsWithoutRef<IconType>> 
  extends ComponentPropsWithoutRef<'button'> {
  children: ReactElement<P, IconType>;
}

export const IconButton = <P extends ComponentPropsWithoutRef<IconType>>({ 
  children, 
  ...buttonProps 
}: IconButtonProps<P>) => {
    return <Button type='button' variant='outline' size='icon' {...buttonProps} className='text-xl text-[var(--summer-tropical-primary)] hover:text-white cursor-pointer transition-all' >
        {children}
    </Button>
}