package com.todowork.exceptions.projectTaskException;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class ProjectTaskNotFoundException extends RuntimeException {
    public ProjectTaskNotFoundException(String message) {
        super(message);
    }
}
