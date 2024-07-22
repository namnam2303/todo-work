package com.todowork.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank(message = "Project name is required")
    private String projectName;
    @NotBlank(message = "Project identifier is required")
    @Size(min = 4, max = 5, message = "Please use 4 to 5 characters")
    @Column(unique = true, updatable = false)
    private String projectIdentifier;
    @NotBlank(message = "project description is required")
    private String description;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(updatable = false)
    private Date createDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date updateDate;

    @PrePersist
    protected void onCreate() {
        createDate = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        updateDate = new Date();
    }
}
