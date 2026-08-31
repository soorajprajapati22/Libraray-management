package com.librarymanagement.service;

import com.librarymanagement.dto.req.BookCreateRequest;
import com.librarymanagement.dto.req.BookUpdateRequest;
import com.librarymanagement.dto.resp.BookResponse;

import java.util.List;

public interface BookService {

    BookResponse createBook(BookCreateRequest request);

    List<BookResponse> getAllBooks();

    BookResponse getBookById(Long id);

    BookResponse updateBook(Long id, BookUpdateRequest request);

    void deleteBook(Long id);
}
