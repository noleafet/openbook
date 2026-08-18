import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


import { Book } from "@/types/book.types";
import { Bookmark } from "@/types/bookmark.types";
import { BookTreeItem } from "@/types/tree.types";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function openNewWindow(url:string) {
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const TreeUtil = {

  searchBookTreeItemLabelById: (id: string, bookTreeItem: BookTreeItem): string => {
    let label = '';
    if (id == bookTreeItem.id) {
      label = bookTreeItem.label ? String(bookTreeItem.label) : '';
    } else if (bookTreeItem.children) {
      for (const item of bookTreeItem.children) {
        label = TreeUtil.searchBookTreeItemLabelById(id, item);

        if (label.length > 0) break;
      }
    }
    return label;
  },

  bookmarkBookTreeItemById: (id: string, bookTreeItem: BookTreeItem): void => {
    console.log('id/' + id + '/treeid/' + bookTreeItem.id);
    if (id == bookTreeItem.id) {
      bookTreeItem.isBookmarked = true;
      return;
    } else if (bookTreeItem.children) {
      for (const item of bookTreeItem.children) {
        TreeUtil.bookmarkBookTreeItemById(id, item);
      }
    }
  },

  parseBookTreeItemId: (itemId: string): { dataKey: string; dataId: number } => {
    const [dataKey, idString] = itemId.split('-');
    const dataId = parseInt(idString);

    return { dataKey, dataId };
  },


  parseTextUrl: (text: string): string => {
    const textSplit = text.split('|');
    return textSplit[1] ?? '';
  }

}


export const BookUtil = {

  findBookByBookmark: (bookmark: Bookmark, books: Book[]): Book | undefined => {
    return books.find(book =>
      book?.chapters?.some(chapter =>
        chapter?.pages?.some(page =>
          (bookmark?.page?.id === page?.id) ||
          page?.lines?.some(line => bookmark?.line?.id === line?.id)
        )
      )
    );
  },

  findUrlByBookmark: (bookmark: Bookmark, books: Book[]): string => {
    let url = '';
    books.map(book =>
      book?.chapters?.map(chapter => {
        chapter?.pages?.map(page => {
          if ((bookmark?.page?.id === page?.id) ||
            page?.lines?.some(line => bookmark?.line?.id === line?.id)) {
            url = TreeUtil.parseTextUrl(chapter.title) + TreeUtil.parseTextUrl(page.note);
            page?.lines?.map(line => {
              if (bookmark?.line?.id === line?.id) url = url + TreeUtil.parseTextUrl(line.content);
            })
          }
        })
      })
    );
    return url;
  },

  findBookmarkId: (key: string, id: number, bookmarks: Bookmark[]): number => {
    const found = bookmarks.find(bookmark =>
      (key === 'l' && bookmark.line?.id === id) ||
      (key === 'p' && bookmark.page?.id === id)
    );
    return found?.id || -1;
  }
}