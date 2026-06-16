ALTER TABLE book 
ADD created_by VARCHAR(255),
ADD modified_by VARCHAR(255);

ALTER TABLE chapter 
ADD created_by VARCHAR(255),
ADD modified_by VARCHAR(255);

ALTER TABLE page 
ADD created_by VARCHAR(255),
ADD modified_by VARCHAR(255);

ALTER TABLE line 
ADD created_by VARCHAR(255),
ADD modified_by VARCHAR(255);

ALTER TABLE user 
ADD created_by VARCHAR(255),
ADD modified_by VARCHAR(255);

ALTER TABLE userbook 
ADD created_by VARCHAR(255),
ADD modified_by VARCHAR(255);