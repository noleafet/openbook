'use client';

import { BookTreeItem } from '@/types/tree.types';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRichTreeViewApiRef, useTreeItemModel } from '@mui/x-tree-view';
import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
import Box from '@mui/material/Box';
import { MdOutlineBookmark } from 'react-icons/md';



const theme = createTheme({
  typography: {
    fontFamily: 'Helvetica, Arial, monospace',
    fontSize: 11,
  },
});

type LineProps = {
  items: BookTreeItem[],
  selectedItem: string,
  onSelectedItemChange: (event: React.SyntheticEvent | null, itemId: string | null) => void;
};

interface CustomLabelProps {
  itemId: string;
  fallbackLabel: string;
}

function CustomLabel({ itemId, fallbackLabel }: CustomLabelProps) {
  // 2. Fetch the node data safely using the official hook
  const item = useTreeItemModel<BookTreeItem>(itemId); // 

  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {item?.isBookmarked && <MdOutlineBookmark className='text-summer-tropical-primary' />}
      {item?.label || fallbackLabel}
    </span>
  );
}

export default function BookTree({ items, selectedItem, onSelectedItemChange }: LineProps) {

  return (
      <div className="flex justify-center items-center pt-2 pb-5">
        <div className='w-11/12 bg-black/15!'>
        <ThemeProvider theme={theme}>
        <Box 
          sx={{ 
            overflowY: 'auto'
          }}
        >
          <RichTreeView
            items={items}
            slotProps={{
              item: (ownerState) => {
                return {
                  slotProps: {
                    label: {
                      // Use the custom layout renderer to fetch the item's live model data
                      children: <CustomLabel itemId={ownerState.itemId} fallbackLabel={ownerState.label} />
                    }
                  }
                };
              }
            }}
            onSelectedItemsChange={onSelectedItemChange}
            // Use 'selected' prop to make it controlled
            selectedItems={selectedItem}
          />
        </Box>
        </ThemeProvider>
        </div>
      </div>
  )
}