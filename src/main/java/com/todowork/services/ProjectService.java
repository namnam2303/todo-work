package com.todowork.services;

import com.todowork.domain.Project;
import com.todowork.exceptions.ProjectIdException;
import com.todowork.repository.ProjectRepository;
import org.hibernate.service.spi.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdate(Project project) {
        try {
            project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
            return projectRepository.save(project);
        } catch (Exception e){
            throw new ProjectIdException("Project ID" + project.getProjectIdentifier().toUpperCase() + " already exists");
        }
    }
}
