package com.todowork.services;

import com.todowork.domain.Backlog;
import com.todowork.domain.Project;
import com.todowork.exceptions.ProjectIdException;
import com.todowork.repository.BacklogRepository;
import com.todowork.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;
    @Autowired
    private BacklogRepository backlogRepository;

    public Project save(Project project) {
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();
        try {
            project.setProjectIdentifier(projectIdentifier);
            handleBacklogForProject(project);
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project ID '" + projectIdentifier + "' already exists");
        }
    }

    private void handleBacklogForProject(Project project) {
        String projectIdentifier = project.getProjectIdentifier().toUpperCase();
        if (project.getId() == null) {      // a new project
            Backlog backlog = new Backlog();
            backlog.setProject(project);
            backlog.setProjectIdentifier(projectIdentifier);
            project.setBacklog(backlog);
        } else {            // an old project to update
            project.setBacklog(backlogRepository.findByProjectIdentifier(projectIdentifier));
        }
    }
    public Project findProjectByProjectIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID" + projectIdentifier.toUpperCase() + " not found");
        }
        return project;
    }

    public Iterable<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByProjectIdentifier(String projectIdentifier) {
        Project project = findProjectByProjectIdentifier(projectIdentifier.toUpperCase());
        if (project == null) {
            throw new ProjectIdException("Project ID '" + projectIdentifier.toUpperCase() + "' does not exist");
        }
        projectRepository.delete(project);
    }

    public void updateProjectByProjectIdentifier(String projectIdentifier, Project project) {
        Project projectToUpdate = findProjectByProjectIdentifier(projectIdentifier.toUpperCase());
        if (projectToUpdate == null) {
            throw new ProjectIdException("Project ID '" + projectIdentifier.toUpperCase() + "' does not exist");
        } else {
            projectToUpdate.setProjectName(project.getProjectName());
            projectToUpdate.setDescription(project.getDescription());
            projectToUpdate.setEndDate(project.getEndDate());
            projectToUpdate.setStartDate(project.getStartDate());
            projectRepository.save(projectToUpdate);
        }
    }
}
