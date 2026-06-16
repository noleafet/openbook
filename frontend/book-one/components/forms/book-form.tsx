'use client';


import { useForm } from 'react-hook-form';


import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { PiBooksDuotone, PiFloppyDiskDuotone } from 'react-icons/pi';

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
import { User } from "@/types/user.types";

// 1. Define schema for validation
const formSchema = z.object({
  title: z.string().min(2, { message: 'Label must be at least 2 characters.' }),
});

interface BookFormProps {
  user: User;
}

export default function BookForm({ user }: BookFormProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: '', },
  });

  const onFormSubmit = (values: z.infer<typeof formSchema>) => {
    BookService.createBook({ title: values.title, author: user.username });
    console.log('Form submitted with:', values);
  };

  const onButtonClick = (action: string) => {
    console.log('Action taken:', action);
  };

  return (
    <>
      <div>
        <IconButton title='Add book' onClick={() => onButtonClick('add-book')}>
          <PiBooksDuotone />
        </IconButton>
      </div>
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
    </>
  );
}
