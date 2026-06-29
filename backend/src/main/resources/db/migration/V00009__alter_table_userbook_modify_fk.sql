-- 1. Remove the old behavior
ALTER TABLE userbook DROP FOREIGN KEY userbook_ibfk_2;

-- 2. Apply the new behavior
ALTER TABLE userbook 
ADD CONSTRAINT userbook_ibfk_2 
FOREIGN KEY (book_id) REFERENCES book (id) 
ON DELETE CASCADE;