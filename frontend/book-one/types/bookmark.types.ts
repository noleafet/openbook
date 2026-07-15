import { Page, Line } from "./book.types";

export interface Bookmark {
  id: number;
  page: Page;
  line: Line;
}
