package com.todowork.services;

import com.todowork.domain.Backlog;
import com.todowork.domain.ProjectTask;
import com.todowork.repository.BacklogRepository;
import com.todowork.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectTaskService {
    @Autowired
    private BacklogRepository backlogRepository;
    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public List<ProjectTask> getProjectTasks() {
        return new ArrayList<>();
    }

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        //Exception : project not found


        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        projectTask.setBacklog(backlog);
        Integer backlogSequence = backlog.getPTSequence();

        //update backlog sequence
        backlogSequence++;
        backlog.setPTSequence(backlogSequence);
        initializeProjectTaskProps(backlog, projectTask);

        projectTaskRepository.save(projectTask);
        return projectTask;
    }
    private void initializeProjectTaskProps(Backlog backlog, ProjectTask projectTask) {
        projectTask.setProjectSequence(backlog.getProjectIdentifier() + "-" + backlog.getPTSequence());
        projectTask.setProjectIdentifier(backlog.getProjectIdentifier());

        //Initial priority when it is null
        if(projectTask.getPriority() == null || projectTask.getPriority() == 0) {
            projectTask.setPriority(3);
        }

        //Initial status when it is null
        if(projectTask.getStatus() == null ||  projectTask.getStatus().isBlank()) {
            projectTask.setStatus("TODO");
        }

    }
}
