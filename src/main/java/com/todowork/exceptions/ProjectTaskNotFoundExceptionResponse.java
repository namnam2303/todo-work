package com.todowork.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ProjectTaskNotFoundExceptionResponse {
    private String projectTaskNotFound;
}