CREATE TABLE IF NOT EXISTS userbook (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(id),
    book_id BIGINT NOT NULL UNIQUE,
    FOREIGN KEY (book_id) REFERENCES book(id),
    created_at DATETIME,
    modified_at DATETIME
);
