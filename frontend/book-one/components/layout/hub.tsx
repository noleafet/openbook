import React, { useState } from 'react';

import LineCard, { CardConfig } from '@/components/ui/cards/line-card';

import { Meta, MetaApp } from '@/lib/meme';
import { Line } from '@/types/book.types';

export default function Hub({ data }: { data: Line[] }) {

    const [activeId, setActiveId] = useState(0);

    const toggleSibling = (id: number) => {
        setActiveId(prev => (prev === id ? 0 : id));
    };

    const cardConfigs: CardConfig[] = data.map(line => {
        return {
            title: line.content,
            //url: Meta.getPageUrl(MetaApp.Facebook, 'Ffttmph'),
            url: Meta.getPageUrl(MetaApp.Facebook, 'bbcnews'),
            iframeWidth: Meta.getConfigDefault().width,
            iframeHeight: 1000
        }
    });

    return (
        <div className="col-span-5 flex-1 bg-white/10 overflow-hidden">
            {cardConfigs.map((cardConfig, index) => (
                <LineCard key={index+1} id={index+1} activeId={activeId} onToggle={toggleSibling} cardConfig={cardConfig}/>
            ))}

        </div>
    );

};
