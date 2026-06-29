import { Book, Line } from "@/types/book.types";
import { BookTreeItem } from "@/types/tree.types";


export function transformBookToTreeItem(book: Book): BookTreeItem {
    console.log(book);

    const chapterItem: BookTreeItem[] = [];

    book.chapters.forEach(
        chapter => {
            const pageItem: BookTreeItem[] = [];
            chapter.pages.forEach(
                page => {
                    const lineItem: BookTreeItem[] = [];
                    page.lines.forEach(
                        line => lineItem.push(transformLineToTreeItem(line))
                    );
                    pageItem.push({
                        id: 'p-' + page.id,
                        label: (page.note === undefined || page.note === '') ? String(page.number) : cleanLabel(page.note),
                        children: lineItem,
                    });
                }
            );

            chapterItem.push({
                id: 'c-' + chapter.id,
                label: cleanLabel(chapter.title),
                children: pageItem,
            });
        }
    );

    const item: BookTreeItem = {
        id: 'b-'+book.id,
        label: cleanLabel(book.title),
        children: chapterItem,
    };

    return item;
}

function transformLineToTreeItem(line: Line): BookTreeItem {
    if (line.lines.length == 0) {
        return {
            id: 'l-' + line.id,
            label: cleanLabel(line.content),
            children: [],
        };
    } else {
        const lineChildren: BookTreeItem[] = [];
        line.lines.forEach(
            subline => lineChildren.push(transformLineToTreeItem(subline))

        );
        return {
            id: 'l-' + line.id,
            label: cleanLabel(line.content),
            children: lineChildren
        }
    }
}

function cleanLabel(text: string) {
    //strip other contents e.g. url
    text = (text.indexOf('|') != -1) ? text[0] : text;
    return text;
}


export function transformBookToLineArray(book: Book): Line[] {
    const lineArr: Line[] = [];

    book.chapters.forEach(
        chapter => chapter.pages.forEach(
            page => page.lines.forEach(
                line => lineArr.push(...extractSubLines(line))
            )
        )
    )

    return lineArr;
}

function extractSubLines(line: Line): Line[] {
    const lineArr: Line[] = [];

    if (line.lines.length == 0) {
        lineArr.push(line);
    } else {
        line.lines.forEach(
            subline => lineArr.push(...extractSubLines(subline))
        )
    }

    return lineArr;
}