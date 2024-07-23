package com.todowork.services;

import com.todowork.domain.Project;
import com.todowork.exceptions.ProjectIdException;
import com.todowork.repository.ProjectRepository;
import jakarta.validation.constraints.NotNull;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project save(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception e){
            throw new ProjectIdException("Project ID" + project.getProjectIdentifier().toUpperCase() + " already exists");
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
