CREATE TABLE IF NOT EXISTS book (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    created_at DATETIME,
    modified_at DATETIME
);

CREATE TABLE IF NOT EXISTS chapter (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book(id),
    title VARCHAR(255) NOT NULL,
    created_at DATETIME,
    modified_at DATETIME
);

CREATE TABLE IF NOT EXISTS page (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    chapter_id BIGINT NOT NULL,
    FOREIGN KEY (chapter_id) REFERENCES chapter(id),
    created_at DATETIME,
    modified_at DATETIME
);

CREATE TABLE IF NOT EXISTS line (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    page_id BIGINT NOT NULL,
    FOREIGN KEY (page_id) REFERENCES page(id),
    line_id BIGINT NOT NULL,
    FOREIGN KEY (line_id) REFERENCES line(id),
    content VARCHAR(255) NOT NULL,
    created_at DATETIME,
    modified_at DATETIME
);