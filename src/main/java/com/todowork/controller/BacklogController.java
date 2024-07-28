package com.todowork.controller;

import com.todowork.domain.Backlog;
import com.todowork.domain.ProjectTask;
import com.todowork.exceptions.projectExceptions.ProjectNotFoundException;
import com.todowork.exceptions.projectTaskException.ProjectTaskNotFoundException;
import com.todowork.services.MapValidationErrorService;
import com.todowork.services.ProjectTaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

    @Autowired
    ProjectTaskService projectTaskService;

    @Autowired
    MapValidationErrorService mapValidationErrorService;
    @PostMapping("/{projectIdentifier}")
    public ResponseEntity<?> addTaskToBacklog(@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult, @PathVariable String projectIdentifier) {
        ResponseEntity<?> errorsMap = mapValidationErrorService.mapValidationError(bindingResult);
        if (errorsMap != null) return errorsMap;    //Validation Errors

        ProjectTask projectTask1 = projectTaskService.addProjectTask(projectIdentifier, projectTask);
        return new ResponseEntity<>(projectTask1, HttpStatus.CREATED);

    }

    @GetMapping("/{projectIdentifier}")
    public ResponseEntity<List<ProjectTask>> getBacklogTasks(@PathVariable String projectIdentifier) {
        Backlog backlog = projectTaskService.getBacklogByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectIdentifier + "' not found");
        }
        return new ResponseEntity<>(projectTaskService.findProjectTaskByProjectIdentifier(projectIdentifier), HttpStatus.OK);
    }

    @GetMapping("/{projectIdentifier}/{task_sequence}")
    public ResponseEntity<ProjectTask> getTask(@PathVariable String projectIdentifier, @PathVariable String task_sequence) {
        projectIdentifier = projectIdentifier.toUpperCase();
        Backlog backlog = projectTaskService.getBacklogByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project with ID '" + projectIdentifier + "' not found");
        }
        ProjectTask task = projectTaskService.findTaskByProjectSequence(task_sequence);
        if (task == null) {
            throw new ProjectTaskNotFoundException("Project task '" + task_sequence + "' not found");
        }
        if (!projectIdentifier.equals(task.getProjectIdentifier())) {
            throw new ProjectTaskNotFoundException("Project task '" + task_sequence + "'  not belong to project '" + projectIdentifier + "'");
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    @PutMapping("/{task_sequence}")
    public ResponseEntity<?> updateTask(@PathVariable String task_sequence, @Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult) {
        ResponseEntity<?> errorsMap = mapValidationErrorService.mapValidationError(bindingResult);
        if (errorsMap != null) return errorsMap;


        ProjectTask taskToUpdate = projectTaskService.findTaskByProjectSequence(task_sequence);
        if (taskToUpdate == null) {
            throw new ProjectTaskNotFoundException("Project task '" + task_sequence + "' not found");
        }
        taskToUpdate = projectTaskService.updateProjectTaskByTaskSequence(task_sequence, projectTask);
        return new ResponseEntity<>(taskToUpdate, HttpStatus.OK);
    }

    @DeleteMapping("/{task_sequence}")
    public ResponseEntity<?> deleteTask(@PathVariable String task_sequence) {
        return new ResponseEntity<>(projectTaskService.deleteTaskByTaskSequence(task_sequence),HttpStatus.OK);
    }

}