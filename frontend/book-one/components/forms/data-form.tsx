'use client';

import { useEffect } from "react";

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { BiSave } from 'react-icons/bi';
import { MdOutlineBookmark, MdOutlineBookmarkBorder } from "react-icons/md";
import { PiMinusDuotone } from "react-icons/pi";
import { TiFlowChildren } from "react-icons/ti";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { IconButton } from '@/components/ui/icon-button';
import { Input } from '@/components/ui/input';

import { Book, Chapter, Line, Page } from "@/types/book.types";
import { Bookmark } from "@/types/bookmark.types";

import { BookmarkService } from "@/services/bookmark-service";
import { BookTypeMapping, ServiceMap } from "@/services/service-map";


const formSchema = z.object({
  label: z.string().min(2, { message: 'Label must be at least 2 characters.' }),
});

interface DataFormProps {
  dataKey: string;
  dataId: number;
  bookmarkId: number;
  handler?: (action: string) => void;
}

const getlabelMapping = (dataKey: string, response: unknown): string => {
  if (!response) return '';

  const map: Record<string, string> = {
    'b': (response as Book).title,
    'c': (response as Chapter).title,
    'p': (response as Page).note || String((response as Page).number),
    'l': (response as Line).content
  };

  return map[dataKey];
}

export default function DataForm({ dataKey, dataId, bookmarkId, handler }: DataFormProps) {

  type BookData = z.infer<typeof formSchema>;

  const isBookmarked = bookmarkId != -1;

  const form = useForm<BookData>({
    resolver: zodResolver(formSchema),
    defaultValues: { label: '' },
  });

  useEffect(() => {
    if (dataId) {

      const service = ServiceMap.getServiceByKey(dataKey);
      service.getById(dataId).then(response => form.setValue("label", getlabelMapping(dataKey, response)));
    }
  }, [dataId, dataKey, form]);

  const onFormSubmit = (values: BookData) => {
    console.log('Form submitted with:', values);

    const actionMap: Record<string, BookTypeMapping> = {
      'b': { title: values.label } as Book,
      'c': { title: values.label } as Chapter,
      'p': { note: values.label } as Page,
      'l': { content: values.label } as Line
    };

    ServiceMap.getServiceByKey(dataKey).update(dataId, actionMap[dataKey]).then(() => handler?.('dataUpdated'));
  };

  const onButtonClick = (action: string) => {
    console.log('Action taken:', action);

    if (dataId) {

      const service = ServiceMap.getServiceByKey(dataKey);

      const actionMap: Record<string, () => void> = {
        bookmark: () => {
          const service = new BookmarkService();

          if (isBookmarked) service.delete(bookmarkId).then(() => handler?.('bookmarkRemoved'));
          else {
            const page_id = dataKey === 'p' ? dataId : null;
            const line_id = dataKey === 'l' ? dataId : null;
            service.createByPageIdOrLineId({ 'pageId': page_id , 'lineId': line_id }).then(() => handler?.('bookmarkAdded'));
          }

        },
        remove: () => service.delete(dataId).then(() => handler?.('itemRemoved')),
        addChild: () => handler?.('showChildForm'),
        default: () => console.log('Action not registered')
      };

      // Execute the matching action, or fall back to the default
      (actionMap[action] || actionMap.default)();
    }

  };


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
                <IconButton title='Remove book' onClick={() => onButtonClick('remove')}>
                  <PiMinusDuotone />
                </IconButton>
                {dataKey && ['p', 'l'].includes(dataKey) &&
                  <IconButton title='Bookmark' onClick={() => onButtonClick('bookmark')}>
                    {isBookmarked ? <MdOutlineBookmark /> : <MdOutlineBookmarkBorder />}
                  </IconButton>
                }
                <IconButton title='Add child' onClick={() => onButtonClick('addChild')}>
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
