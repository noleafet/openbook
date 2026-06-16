'use client';

import { BookTreeItem } from '@/types/tree.types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';


const theme = createTheme({
 typography: {
    fontFamily: 'Helvetica, Arial, monospace',
    fontSize: 11,
  },
});

type LineProps = {
  items: BookTreeItem[],
  selectedItem: string,
  onSelectedItemsChange: (event: React.SyntheticEvent | null, itemId: string | null) => void;
};

export default function BookTree({ items, selectedItem, onSelectedItemsChange }: LineProps) {

  return (
    <ThemeProvider theme={theme}>
      <div className="flex justify-center items-center pt-2">
        <div className='w-11/12 h-screen'>
          <RichTreeView
            items={items}
            onSelectedItemsChange={onSelectedItemsChange}
            // Use 'selected' prop to make it controlled
            selectedItems={selectedItem}
          />
        </div>
      </div>
    </ThemeProvider>
  )
}