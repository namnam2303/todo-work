package com.todowork.exceptions;

import com.todowork.exceptions.LoginExceptions.InvalidLoginExceptionResponse;
import com.todowork.exceptions.LoginExceptions.UserNotFoundException;
import com.todowork.exceptions.LoginExceptions.UserNotFoundExceptionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(ProjectIdException.class)
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException exception, WebRequest request) {
         ProjectIdExceptionResponse exceptionResponse = new ProjectIdExceptionResponse(exception.getMessage());
         return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(ProjectNotFoundException.class)
    public final ResponseEntity<Object> handleProjectNotFoundException(ProjectNotFoundException exception, WebRequest request) {
        ProjectNotFoundExceptionResponse exceptionResponse = new ProjectNotFoundExceptionResponse(exception.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ProjectTaskNotFoundException.class)
    public final ResponseEntity<Object> handleProjectTaskNotFoundException(ProjectTaskNotFoundException exception, WebRequest request) {
        ProjectTaskNotFoundExceptionResponse exceptionResponse = new ProjectTaskNotFoundExceptionResponse(exception.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public final ResponseEntity<Object> handleUserNotFoundException(UserNotFoundException exception, WebRequest request) {
        UserNotFoundExceptionResponse exceptionResponse = new UserNotFoundExceptionResponse(exception.getMessage());
        return new ResponseEntity(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = {Exception.class})
    public final ResponseEntity<Object> handleInvalidLoginException(Exception exception, WebRequest request) {
        InvalidLoginExceptionResponse invalidLoginResponse = new InvalidLoginExceptionResponse("Username or password is incorrect");
        return new ResponseEntity<>(invalidLoginResponse, HttpStatus.UNAUTHORIZED);
    }
}
