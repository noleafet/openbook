package com.leafnote.openbook.service;

import java.util.List;

import com.leafnote.openbook.dto.BookmarkRequestDTO;
import com.leafnote.openbook.dto.BookmarkResponseDTO;

public interface BookmarkService {

    public BookmarkResponseDTO addBookmark(BookmarkRequestDTO bookmarkDTO);
    
    public void deleteBookmarkById(long id);

    public List<BookmarkResponseDTO> getAllBookmarks();

}
