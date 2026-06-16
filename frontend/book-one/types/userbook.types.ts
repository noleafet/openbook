import { Book } from "./book.types";
import { User } from "./user.types";

export interface UserBook {
  id: number;
  user: User;
  book: Book
}
