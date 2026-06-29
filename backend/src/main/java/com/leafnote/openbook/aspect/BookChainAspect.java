package com.leafnote.openbook.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.leafnote.openbook.controller.UserBookController;
import com.leafnote.openbook.dto.BookDTO;
import com.leafnote.openbook.dto.UserBookRequestDTO;
import com.leafnote.openbook.mapper.BookMapper;
import com.leafnote.openbook.mapper.UserMapper;
import com.leafnote.openbook.response.ApiResponse;
import com.leafnote.openbook.security.UserSecurity;

@Aspect
@Component
public class BookChainAspect {

    private final UserBookController userBookController;

    public BookChainAspect(UserBookController userBookController, UserMapper userMapper, BookMapper bookMapper) {
        this.userBookController = userBookController;
    }

    @Around("@annotation(com.leafnote.openbook.annotation.AuthenticatedAddBook) && args(book, ..)")
    public Object handleAuthenticatedAddBook(ProceedingJoinPoint joinPoint, BookDTO book) throws Throwable {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if (auth instanceof UsernamePasswordAuthenticationToken && auth.isAuthenticated()) {
        
            Object result = joinPoint.proceed();

            if (result instanceof ResponseEntity<?> responseEntity 
                && responseEntity.getBody() instanceof ApiResponse<?> apiResponse 
                && apiResponse.getData() instanceof BookDTO) {
                
                @SuppressWarnings("unchecked")
                ResponseEntity<ApiResponse<BookDTO>> response = (ResponseEntity<ApiResponse<BookDTO>>) joinPoint.proceed();
                    
                Object principal = auth.getPrincipal();
        
                if (principal instanceof UserSecurity) {
                    UserSecurity userSecurity = (UserSecurity) principal;
                    
                    // 2. Safely call your service
                    userBookController.addUserBook(
                        new UserBookRequestDTO(null, userSecurity.getId(), response.getBody().getData().id())
                    );
                }
            }

            return result;
        }

        throw new SecurityException("User is not authenticated");
    }
}
