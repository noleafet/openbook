export interface BookTreeItem {
  id: string;
  label: React.ReactNode;
  isBookmarked?: boolean;
  children?: BookTreeItem[];
  disabled?: boolean; // Optional: To disable the item
}