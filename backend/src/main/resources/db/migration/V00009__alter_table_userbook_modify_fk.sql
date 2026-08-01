-- 1. Remove the old behavior
ALTER TABLE userbook DROP CONSTRAINT userbook_book_id_key;

-- 2. Apply the new behavior
ALTER TABLE userbook 
ADD CONSTRAINT userbook_book_id_key 
FOREIGN KEY (book_id) REFERENCES book (id) 
ON DELETE CASCADE;