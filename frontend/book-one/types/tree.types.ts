export interface BookTreeItem {
  id: string;
  label: React.ReactNode;
  children?: BookTreeItem[];
  disabled?: boolean; // Optional: To disable the item
}