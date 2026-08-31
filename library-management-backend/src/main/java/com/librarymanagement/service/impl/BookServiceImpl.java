package com.librarymanagement.service.impl;

import com.librarymanagement.dto.req.BookCreateRequest;
import com.librarymanagement.dto.req.BookUpdateRequest;
import com.librarymanagement.dto.resp.BookResponse;
import com.librarymanagement.entity.Book;
import com.librarymanagement.entity.User;
import com.librarymanagement.globalexception.ResourceNotFoundException;
import com.librarymanagement.repository.BookRepository;
import com.librarymanagement.security.SecurityUtils;
import com.librarymanagement.service.BookService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final ModelMapper modelMapper;
    private final SecurityUtils securityUtils;

    @Override
    @Transactional
    public BookResponse createBook(BookCreateRequest request) {
        User currentUser = securityUtils.getCurrentUser();
        Book book = modelMapper.map(request, Book.class);
        book.setUser(currentUser);
        Book saved = bookRepository.save(book);
        return modelMapper.map(saved, BookResponse.class);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookResponse> getAllBooks() {
        User currentUser = securityUtils.getCurrentUser();
        return bookRepository.findByUserId(currentUser.getId()).stream()
                .map(book -> modelMapper.map(book, BookResponse.class))
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public BookResponse getBookById(Long id) {
        User currentUser = securityUtils.getCurrentUser();
        Book book = bookRepository.findByIdAndUserId(id, currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        return modelMapper.map(book, BookResponse.class);
    }

    @Override
    @Transactional
    public BookResponse updateBook(Long id, BookUpdateRequest request) {
        User currentUser = securityUtils.getCurrentUser();
        Book book = bookRepository.findByIdAndUserId(id, currentUser.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id: " + id));
        modelMapper.map(request, book);
        Book updated = bookRepository.save(book);
        return modelMapper.map(updated, BookResponse.class);
    }

    @Override
    @Transactional
    public void deleteBook(Long id) {
        User currentUser = securityUtils.getCurrentUser();
        if (!bookRepository.existsByIdAndUserId(id, currentUser.getId())) {
            throw new ResourceNotFoundException("Book not found with id: " + id);
        }
        bookRepository.deleteById(id);
    }
}
