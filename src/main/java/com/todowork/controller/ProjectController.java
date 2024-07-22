package com.todowork.controller;

import com.todowork.domain.Project;
import com.todowork.services.MapValidationErrorService;
import com.todowork.services.ProjectService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/project")
public class ProjectController {

    @Autowired
    private ProjectService service;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
        if (errorMap != null) return errorMap;
        Project newProject = service.saveOrUpdate(project);
        return new ResponseEntity<Project>(newProject, HttpStatus.CREATED);
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<?> findProjectByIdentifier(@PathVariable String projectId) {
        Project project = service.findProjectByProjectIdentifier(projectId);
        return new ResponseEntity<Project>(project, HttpStatus.OK);
    }

    @GetMapping("/all")
    public Iterable<Project> getAllProjects() {
        return service.findAllProjects();
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable String projectId) {
        service.deleteProjectByProjectIdentifier(projectId.toUpperCase());
        return new ResponseEntity<>("Project with id " + projectId.toUpperCase() + " was deleted.",HttpStatus.OK);
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<?> updateProject(@PathVariable String projectId, @Valid @RequestBody Project project, BindingResult bindingResult) {
        ResponseEntity<?> errorMap = mapValidationErrorService.mapValidationError(bindingResult);
        if (errorMap != null) return errorMap;
        service.saveOrUpdate(project);
        return new ResponseEntity<>("Project with ID '" + projectId + "' was updated", HttpStatus.OK);
    }
}
