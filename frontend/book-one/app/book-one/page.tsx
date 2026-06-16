'use client';

import { useEffect, useMemo, useState } from 'react';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import Cookies from 'js-cookie';

import Content from '@/components/layout/content';
import Header from '@/components/layout/header';
import Registry from '@/components/layout/registry';
import Sidebar from '@/components/layout/sidebar';
import Search from '@/components/ui/searches/input-search';
import BookTree from '@/components/ui/trees/book-tree';
import CoverNavigation from '@/components/layout/cover';
//import BinderBar from '@/components/layout/binder';
import Hub from '@/components/layout/hub';

import { UserBookService } from '@/services/userbook-service';
import { User } from '@/types/user.types';
import { BookTreeItem } from '@/types/tree.types';
import { Book, Line } from '@/types/book.types';

import { transformBookToTreeItem, transformBookToLineArray } from '@/lib/transform';
import { searchBookTreeItemLabelById } from '@/lib/utils';

import DataForm from '@/components/forms/data-form';
import BookForm from '@/components/forms/book-form';


export default function BookOne() {

  const [books, setBooks] = useState<Book[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItemLabel, setSelectedItemLabel] = useState('');
  const [covered, setCovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const storedUser = Cookies.get('authUser');
  const user: User = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    if (!user) return;
    UserBookService.getBooksByUserId(user.id).then(setBooks).catch(console.error);
    
  }, [user]);

  const bookTreeItems = useMemo(() => {
    if (!books) return [];
    const bookTreeItems: BookTreeItem[] = [];
    books.forEach(
      book => {
        bookTreeItems.push(transformBookToTreeItem(book));
      }
    );
    //console.log(JSON.stringify(bookTreeItems, null, 2));
    return bookTreeItems;
  }, [books]);

  const lines = useMemo(() => {
    if (!books) return [];
    const lines: Line[] = [];
    books.forEach(
      book => {
        lines.push(...transformBookToLineArray(book));
      }
    );
    console.log(JSON.stringify(lines, null, 2));
    return lines;
  }, [books]);

  const toggleCover = () => {
      setCovered(!covered);
  };

  const toggleHeaderInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleSelectionChange = (
    event: React.SyntheticEvent | null,
    itemId: string | null) => {

    if (!itemId) return null;

    if (itemId == selectedItemId) {
      setShowInfo(!showInfo)
    }
    else {
      setShowInfo(true);
    }

    setSelectedItemId(itemId);

    let label = '';
    for (const item of bookTreeItems) {
      label = searchBookTreeItemLabelById(itemId, item);
      if (label.length > 0) break;
    }
    setSelectedItemLabel(label);
    console.log('Selected Item ID:', itemId);

  };

  const handleFormSubmit = (values: unknown) => {
    console.log('Form submitted with:', values);
  };

  const handleButtonClick = (action: string) => {
    console.log('Action taken:', action);
  };


  return (
    <Theme appearance='dark'>
      
      { lines &&
      <>
        <Header covered={covered} onToggleCover={toggleCover} />
        <CoverNavigation covered={covered} />
        <div className='grid grid-cols-6'>
          
          <Content className='col-span-5 border-r border-gray-700'>
            <Registry showInfo={showInfo} onToggleHeaderInfo={toggleHeaderInfo}>
              <DataForm user={user} text={selectedItemLabel} onButtonClick={handleButtonClick} onFormSubmit={handleFormSubmit} />
            </Registry>
            <Hub data={lines} />
          </Content>

          <Sidebar className='col-span-1'>
            {/*<BinderBar />*/}
            <Search />
            <BookTree items={bookTreeItems} selectedItem={selectedItemId} onSelectedItemsChange={handleSelectionChange} />
            <BookForm user={user} />
          </Sidebar>

        </div>
      </>
      }
    </Theme>
  )

}