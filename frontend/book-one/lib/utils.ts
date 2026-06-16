import { BookTreeItem } from "@/types/tree.types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function searchBookTreeItemLabelById(id: string, bookTreeItem: BookTreeItem): string {
  let label = '';
  if (id == bookTreeItem.id) {
    label = bookTreeItem.label ? String(bookTreeItem.label) : '';
  } else if (bookTreeItem.children) {
    for (const item of bookTreeItem.children) {
      label = searchBookTreeItemLabelById(id, item);

      if (label.length > 0) break;
    }
  }
  return label;
}
