package com.todowork.exceptions.projectExceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ProjectNotFoundExceptionResponse {
    private String projectNotFound;
}