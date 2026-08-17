'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import Content from '@/components/layout/content';
import Cover from '@/components/layout/cover';
import Header from '@/components/layout/header';
import Registry from '@/components/layout/registry';
import Sidebar from '@/components/layout/sidebar';
import Search from '@/components/ui/searches/input-search';
import BookTree from '@/components/ui/trees/book-tree';
//import BinderBar from '@/components/layout/binder';
import Hub from '@/components/layout/hub';

import BookForm from '@/components/forms/book-form';
import DataForm from '@/components/forms/data-form';
import ChildForm from '@/components/forms/child-form';

import InfoCard from '@/components/ui/cards/info-card';

import { Book, Line } from '@/types/book.types';
import { Bookmark } from '@/types/bookmark.types';
import { BookTreeItem } from '@/types/tree.types';
import { User } from '@/types/user.types';

import { UserBookService } from '@/services/userbook-service';
import { BookmarkService } from '@/services/bookmark-service';

import { useCookieListener } from '@/hooks/useCookieListener';

import { transformBookToLineArray, transformBookToTreeItem } from '@/lib/transform';

import { BookUtil, TreeUtil } from '@/lib/utils';


export default function BookOne() {

  const [user, setUser] = useState<User | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [itemId, setItemId] = useState('');
  const [dataKey, setDataKey] = useState('');
  const [dataId, setDataId] = useState(0);
  const [showCover, setShowCover] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showChildForm, setShowChildForm] = useState(false);

  const resetMetaData = useCallback(() => {
    console.log('reset');
    if (user) {
      const service = new UserBookService();
      service.getBooksByUserId(user.id)
        .then(setBooks)
        .catch(console.error);

      const bookmarkService = new BookmarkService();
      bookmarkService.getAll()
        .then(setBookmarks)
        .catch(console.error);
    }
  }, [user, setBooks]);

  useCookieListener('authUser', (cookieUser) => {
    const storedUser: User = cookieUser ? JSON.parse(cookieUser) : null;
    setUser(storedUser);
    resetMetaData();
  });

  useEffect(() => {
    resetMetaData();
  }, [resetMetaData]);

  const bookTreeItems = useMemo(() => {

    if (!books) return [];

    const bookTreeItems: BookTreeItem[] = [];
    books.forEach(book => bookTreeItems.push(transformBookToTreeItem(book)));
    //console.log(JSON.stringify(bookTreeItems, null, 2));
    bookTreeItems.map(bookTreeItem => {
      bookmarks.map(bookmark => {
        console.log('bookmark');
        console.log(bookmark);
        const treeItemId = bookmark.page ? 'p-' + bookmark.page.id : 'l-' + bookmark.line.id;
        TreeUtil.bookmarkBookTreeItemById(treeItemId, bookTreeItem);
      });
    });
    console.log(bookTreeItems);
    return bookTreeItems;
  }, [books, bookmarks]);

  const lines = useMemo(() => {

    if (!books) return [];

    const lines: Line[] = [];
    books.forEach(book => lines.push(...transformBookToLineArray(book)));
    console.log(JSON.stringify(lines, null, 2));
    return lines;
  }, [books]);

  const toggleShowCover = () => {
    setShowCover(!showCover);
  };

  const toggleShowInfo = () => {
    setShowInfo(!showInfo);
  };

  const toggleShowChildForm = () => {

    setShowChildForm(!showChildForm);
  };

  const handleSelectedItemChange = (event: React.SyntheticEvent | null, id: string | null) => {

    if (!id) return null;

    setShowChildForm(false);

    setShowInfo(id === itemId ? !showInfo : true);

    const { dataKey, dataId } = TreeUtil.parseBookTreeItemId(id);

    setItemId(id);
    setDataKey(dataKey);
    setDataId(dataId);
  };

  const handleActionPerformed = (action: string) => {

    console.log('err');

    const resetKeys = ['bookAdded', 'childAdded', 'dataUpdated', 'itemRemoved', 'bookmarkAdded', 'bookmarkRemoved'];

    const actionMap: Record<string, () => void> = {
      ...Object.fromEntries(resetKeys.map(key => [key, resetMetaData])),
      showChildForm: toggleShowChildForm,
      default: () => console.log('Action not registered')
    };

    (actionMap[action] || actionMap.default)();
  }

  return (
    <Theme appearance='dark'>

      {lines &&
        <div className='flex flex-col h-screen overflow-hidden'>
          <Header showCover={showCover} onToggleShowCover={toggleShowCover} />
          <Cover showCover={showCover} />
          <div className='flex-1 grid grid-cols-6 h-full'>

            <Content className='col-span-5 border-r border-gray-700'>
              <Registry showInfo={showInfo} onToggleShowInfo={toggleShowInfo}>
                {user &&
                  <>
                    <InfoCard>
                      <DataForm dataId={dataId} dataKey={dataKey} bookmarkId={BookUtil.findBookmarkId(dataKey, dataId, bookmarks)} handler={handleActionPerformed} />
                    </InfoCard>
                    {showChildForm &&
                      <InfoCard>
                        <ChildForm dataId={dataId} dataKey={dataKey} handler={handleActionPerformed} />
                      </InfoCard>
                    }
                  </>
                }
              </Registry>
              <Hub books={books} bookmarks={bookmarks} />
            </Content>

            <Sidebar className='col-span-1'>
              {/*<BinderBar />*/}
              {user &&
                <>
                  <Search />
                  <BookTree items={bookTreeItems} selectedItem={itemId} onSelectedItemChange={handleSelectedItemChange} />
                  <BookForm user={user} handler={handleActionPerformed} />
                </>
              }
            </Sidebar>

          </div>
        </div>
      }
    </Theme>
  )

}