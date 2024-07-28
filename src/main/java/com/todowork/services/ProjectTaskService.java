package com.todowork.services;

import com.todowork.domain.Backlog;
import com.todowork.domain.ProjectTask;
import com.todowork.exceptions.projectExceptions.ProjectNotFoundException;
import com.todowork.exceptions.projectTaskException.ProjectTaskNotFoundException;
import com.todowork.repository.BacklogRepository;
import com.todowork.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public Backlog getBacklogByProjectIdentifier(String projectIdentifier) throws ProjectNotFoundException {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project ID '" + projectIdentifier + "' not found");
        }
        return backlog;
    }


    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        //Exception : project not found
        try {
            Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
            projectTask.setBacklog(backlog);
            Integer backlogSequence = backlog.getPTSequence();

            //update backlog sequence
            backlogSequence++;
            backlog.setPTSequence(backlogSequence);
            initializeProjectTaskProps(backlog, projectTask);

            projectTaskRepository.save(projectTask);

        } catch (Exception e) {
            throw new ProjectNotFoundException("Project " + "has ID '" + projectIdentifier + "' not found");
        }

        return projectTask;
    }

    public List<ProjectTask> findProjectTaskByProjectIdentifier(String projectIdentifier) {
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        if (backlog == null) {
            throw new ProjectNotFoundException("Project " + "has ID '" + projectIdentifier + "' not found");
        }

        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectIdentifier);
    }

    public ProjectTask findTaskByProjectSequence(String projectSequence) {
        return projectTaskRepository.findProjectTaskByProjectSequence(projectSequence);
    }

    public ProjectTask updateProjectTaskByTaskSequence(String taskSequence, ProjectTask updatedProjectTask) {
        ProjectTask projectTask = findTaskByProjectSequence(taskSequence);
        if (projectTask == null) {
            throw new ProjectNotFoundException("Project " + "has ID '" + taskSequence + "' not found");
        }
        updatedProjectTask.setId(projectTask.getId());
        projectTaskRepository.save(updatedProjectTask);
        return updatedProjectTask;
    }

    private void initializeProjectTaskProps(Backlog backlog, ProjectTask projectTask) {
        projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-" + backlog.getPTSequence());
        projectTask.setProjectIdentifier(backlog.getProjectIdentifier());

        //Initial priority when it is null
        if (projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        //Initial status when it is null
        if (projectTask.getStatus() == null || projectTask.getStatus().isBlank()) {
            projectTask.setStatus("TODO");
        }

    }

    public List<ProjectTask> deleteTaskByTaskSequence(String taskSequence) {
        ProjectTask projectTask = findTaskByProjectSequence(taskSequence);
        if (projectTask == null) {
            throw new ProjectTaskNotFoundException("Project task" + "has ID '" + taskSequence + "' not found");
        }
        projectTaskRepository.delete(projectTask);
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(projectTask.getProjectIdentifier());
    }
}
