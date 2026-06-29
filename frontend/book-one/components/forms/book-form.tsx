'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';


import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { PiFloppyDiskDuotone } from 'react-icons/pi';

import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';

import { BookService } from "@/services/book-service";

import { useIsMounted } from '@/hooks/useIsMounted';
import { User } from "@/types/user.types";


// 1. Define schema for validation
const formSchema = z.object({
  title: z.string().min(2, { message: 'Label must be at least 2 characters.' }),
});

interface BookFormProps {
  user: User;
  onSubmission: () => void;
}

export default function BookForm({ user, onSubmission }: BookFormProps) {

  const [showForm, setShowForm] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    BookService.createBook({ title: values.title, author: user.username }).then(() => onSubmission());
    console.log('Form submitted with:', values);
  };

  const onButtonClick = (action: string) => {
    console.log('Action taken:', action);

    const actionMap: Record<string, () => void> = {
      addBook: () => setShowForm(!showForm),
      default: () => console.log('Action not registered')
    }; 

    // Execute the matching action, or fall back to the default
    (actionMap[action] || actionMap.default)();
  };

  return (
    useIsMounted() &&
    <div className="flex justify-center items-center">
      <div className='w-11/12'>
        <div className='w-full text-lg flex items-center justify-end'>
          <span className={`border border-[#333] bg-[#222] rounded-sm ${showForm && 'rounded-b-none'} p-1 pl-2 flex items-center justify-center cursor-pointer text-summer-tropical-primary hover:text-white`}
            title='Add book' onClick={() => onButtonClick('addBook')}>
            <MdOutlinePlaylistAdd />
          </span>
        </div>

        {showForm &&
          <Card className="w-full p-2 shadow-lg rounded-sm rounded-tr-none">
            <CardContent className='p-0'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-2'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <>
                        <FormItem className='flex w-full items-center justify-betweeen'>
                          <FormControl>
                            <Input placeholder='title' {...field} />
                          </FormControl>
                          <IconButton title='Save' type='submit'>
                            <PiFloppyDiskDuotone />
                          </IconButton>
                        </FormItem>
                        <FormMessage />
                      </>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        }
      </div>
    </div>
  );
}
