package com.todowork.controller;

import com.todowork.domain.Backlog;
import com.todowork.domain.ProjectTask;
import com.todowork.exceptions.ProjectNotFoundException;
import com.todowork.repository.BacklogRepository;
import com.todowork.services.MapValidationErrorService;
import com.todowork.services.ProjectTaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    ProjectTaskService projectTaskService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @Autowired
    private BacklogRepository backlogRepository;

    @PostMapping("/{projectIdentifier}")
    public ResponseEntity<?> addTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult, @PathVariable String projectIdentifier) {
        ResponseEntity<?> errorsMap = mapValidationErrorService.mapValidationError(bindingResult);
        if (errorsMap != null) return errorsMap;    //Validation Errors

        ProjectTask projectTask1 = projectTaskService.addProjectTask(projectIdentifier, projectTask);
        return new ResponseEntity<>(projectTask1, HttpStatus.CREATED);

    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<List<ProjectTask>> getBacklogTasks(@PathVariable String projectIdentifier) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectIdentifier + "' not found");
        }
        return  new ResponseEntity<>(projectTaskService.findProjectTaskByProjectIdentifier(projectIdentifier), HttpStatus.OK);
    }

}