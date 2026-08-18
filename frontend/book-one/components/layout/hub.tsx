import React, { useState } from 'react';

import LineCard, { CardConfig } from '@/components/ui/cards/line-card';

import { Meta, MetaApp } from '@/lib/meme';
import { Book } from '@/types/book.types';
import { Bookmark } from '@/types/bookmark.types';
import { BookUtil, TreeUtil } from '@/lib/utils';

interface HubProps {
    books: Book[];
    bookmarks: Bookmark[];

}

export default function Hub({ books, bookmarks }: HubProps) {

    const [activeId, setActiveId] = useState(0);

    const toggleSibling = (id: number) => {
        setActiveId(prev => (prev === id ? 0 : id));
    };

    const cardConfigs: CardConfig[] = bookmarks.map(bookmark => {
        return {
            title: bookmark.page?.note.split('|')[0] || bookmark.line?.content.split('|')[0],
            //url: Meta.getPageUrl(MetaApp.Facebook, 'Ffttmph'),
            url: BookUtil.findUrlByBookmark(bookmark, books),
            //iframeWidth: 0,
            //iframeHeight: 0
        }
    });

    return (
        <div className="col-span-5 flex-1 bg-white/10 overflow-hidden">
            {cardConfigs.map((cardConfig, index) => (
                <LineCard key={index + 1} id={index + 1} activeId={activeId} onToggle={toggleSibling} cardConfig={cardConfig} />
            ))}

        </div>
    );

};
