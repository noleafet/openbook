'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import Content from '@/components/layout/content';
import CoverNavigation from '@/components/layout/cover';
import Header from '@/components/layout/header';
import Registry from '@/components/layout/registry';
import Sidebar from '@/components/layout/sidebar';
import Search from '@/components/ui/searches/input-search';
import BookTree from '@/components/ui/trees/book-tree';
//import BinderBar from '@/components/layout/binder';
import Hub from '@/components/layout/hub';

import { BookService } from '@/services/book-service';
import { UserBookService } from '@/services/userbook-service';

import { Book, Line } from '@/types/book.types';
import { BookTreeItem } from '@/types/tree.types';
import { User } from '@/types/user.types';

import { useCookieListener } from '@/hooks/useCookieListener';

import { transformBookToLineArray, transformBookToTreeItem } from '@/lib/transform';
import { searchBookTreeItemLabelById } from '@/lib/utils';

import BookForm from '@/components/forms/book-form';
import DataForm from '@/components/forms/data-form';


export default function BookOne() {

  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedItemLabel, setSelectedItemLabel] = useState('');
  const [covered, setCovered] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const resetTree = useCallback(() => {
    console.log('reset');
    if (user) {
      UserBookService.getBooksByUserId(user.id)
        .then(setBooks)
        .catch(console.error);
    }
  }, [user, setBooks]);

  useCookieListener('authUser', (cookieUser) => {
    const storedUser: User = cookieUser ? JSON.parse(cookieUser) : null;
    setUser(storedUser);
    resetTree();
  });

  useEffect(() => {
    resetTree();
  }, [resetTree]);

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

    const [itemTypeId, itemIdStr] = selectedItemId.split('-');
    const itemId = parseInt(itemIdStr);

    const actionMap: Record<string, () => void> = {
      removeBook: () => deleteItem(itemTypeId, itemId),
      default: () => console.log('Action not registered')
    };

    // Execute the matching action, or fall back to the default
    (actionMap[action] || actionMap.default)();

  };

  const deleteItem = (itemTypeId: string, itemId: number): void => {
    console.log('ItemTypeId taken:', itemTypeId);

    const serviceMap: Record<string, () => void> = {
      'b': () => BookService.removeBookById(itemId).then(() => {
        resetTree();
      }).catch(console.error),
    };

    (serviceMap[itemTypeId] || serviceMap.default)();
  }


  return (
    <Theme appearance='dark'>

      {lines &&
        <>
          <Header covered={covered} onToggleCover={toggleCover} />
          <CoverNavigation covered={covered} />
          <div className='grid grid-cols-6'>

            <Content className='col-span-5 border-r border-gray-700'>
              <Registry showInfo={showInfo} onToggleHeaderInfo={toggleHeaderInfo}>
                {user &&
                  <DataForm user={user} text={selectedItemLabel} onButtonClick={handleButtonClick} onFormSubmit={handleFormSubmit} />}
              </Registry>
              <Hub data={lines} />
            </Content>

            <Sidebar className='col-span-1'>
              {/*<BinderBar />*/}
              {user &&
                <>
                  <Search />
                  <BookTree items={bookTreeItems} selectedItem={selectedItemId} onSelectedItemsChange={handleSelectionChange} />
                  <BookForm user={user} onSubmission={() => resetTree()} />
                </>
              }
            </Sidebar>

          </div>
        </>
      }
    </Theme>
  )

}