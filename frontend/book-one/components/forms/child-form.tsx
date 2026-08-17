'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { BiSave } from 'react-icons/bi';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';

import { BookTypeMapping, ServiceMap } from '@/services/service-map';
import { Book, Chapter, Page, Line} from '@/types/book.types';
import { Service } from '@/services/service';

const formSchema = z.object({
  label: z.string().min(2, { message: 'Label must be at least 2 characters.' }),
  url: z.string(),
});

interface ChildFormProps {
  dataKey: string;
  dataId: number;
  handler?: (action: string) => void;
}


export default function ChildForm({ dataKey, dataId, handler }: ChildFormProps) {

  type BookData = z.infer<typeof formSchema>;

  const form = useForm<BookData>({
    resolver: zodResolver(formSchema),
    defaultValues: { label: '', url: ''},
  });

  const onFormSubmit = (values: BookData) => {
    console.log('Form submitted with:', values);
    const valuesUrl = values.url? '|' + values.url: '';
    const data = values.label + valuesUrl;
    const actionMap: Record<string, () => Promise<BookTypeMapping>> = {
      'b': () => ServiceMap.getServiceByKey('c').create({title: data, bookId: dataId} as Chapter),
      'c': () => ServiceMap.getServiceByKey('p').create({note: data, chapterId: dataId} as Page),
      'p': () => ServiceMap.getServiceByKey('l').create({content: data, pageId: dataId} as Line),
      'l': () => ServiceMap.getServiceByKey('l').create({content: data, lineId: dataId} as Line)
    };
    actionMap[dataKey]?.().then(() => handler?.('childAdded'));
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className='flex space-x-2'>
        <FormField
          control={form.control}
          name='label'
          render={({ field }) => (
            <>
              <FormItem className='flex items-center justify-betweeen'>
                <FormControl>
                  <Input placeholder='label' {...field} />
                </FormControl>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
        <FormField
          control={form.control}
          name='url'
          render={({ field }) => (
            <>
              <FormItem className='flex items-center justify-betweeen'>
                <FormControl>
                  <Input placeholder='url' {...field} />
                </FormControl>
                <IconButton title='Save' type='submit'>
                  <BiSave />
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
