'use client';

import { useEffect } from "react"

import { useForm } from 'react-hook-form';

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { BiSave } from 'react-icons/bi';
import { CgBookmark } from "react-icons/cg";
import { FaGears } from "react-icons/fa6";
import { TiFlowChildren } from "react-icons/ti";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { IconButton } from '@/components/ui/icon-button';
import { User } from "@/types/user.types";



// 1. Define schema for validation
const formSchema = z.object({
  label: z.string().min(2, { message: 'Label must be at least 2 characters.' }),
});

interface DataFormProps {
  user: User;
  text: string;
  onButtonClick: (action: string) => void;
  onFormSubmit: (values: z.infer<typeof formSchema>) => void;
}

export default function DataForm({ text, onButtonClick, onFormSubmit }: DataFormProps) {
  // 2. Define form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { label: text },
  });


  // Set the value whenever the 'userData' prop updates
  useEffect(() => {
    if (text) {
      form.setValue("label", text)
    }
  }, [text, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className='space-y-2'>
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <>
              <FormItem className='flex w-full items-center justify-betweeen'>
                <FormControl>
                  <Input placeholder='title|url' {...field} />
                </FormControl>
                <IconButton title='Save' type='submit'>
                  <BiSave />
                </IconButton>
                <IconButton title='Bookmark' onClick={() => onButtonClick('bookmark')}>
                  <CgBookmark />
                </IconButton>
                <IconButton title='Configure' onClick={() => onButtonClick('configure')}>
                  <FaGears />
                </IconButton>
                <IconButton title='Add child' onClick={() => onButtonClick('add-child')}>
                  <TiFlowChildren />
                </IconButton>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
      </form>
    </Form>
  );
}
