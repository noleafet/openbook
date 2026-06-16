
export enum MetaApp { Facebook, Instagram, Thread }

export interface MemeConfig {
    width: number;
    height: number;
}

export const Meta = {

    isUrlMeta: (url: string): boolean => {
        const keywords: string[] = ['facebook', 'instagram', 'thread'];

        return keywords.some(keyword => url.includes(keyword));
    },

    getPageUrl: (app: MetaApp, page: string, width?: number, height?: number): string => {

        const metaConfig: MemeConfig = Meta.getConfigDefault();
        const pageWidth = width ?? metaConfig.width;
        const pageHeight = height ?? metaConfig.height;

        switch (app) {
            case MetaApp.Facebook:
                return 'https://www.facebook.com/plugins/page.php'
                    + '?href=https%3A%2F%2Fwww.facebook.com%2F'
                    + page + '%2F'
                    + '&tabs=timeline&width='
                    + pageWidth
                    + '&height='
                    + pageHeight
                    + '&small_header=true&adapt_container_width=true&hide_cover=true&show_facepile=true&appId';
            default:
                return '';
        }
    },

    getConfigDefault: (): MemeConfig => {
        return {
            width: 500,
            height: 1000
        };
    }
}