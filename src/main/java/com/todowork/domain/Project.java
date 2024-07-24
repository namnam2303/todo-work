package com.todowork.domain;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
    @Size(min = 4, max = 7, message = "Please use 4 to 7 characters")
    @Column(unique = true, updatable = false)
    private String projectIdentifier;
    @NotBlank(message = "Project description is required")
    private String description;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "project")
    @JsonIgnore
    private Backlog backlog;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "Start date is required")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @NotNull(message = "End date is required")
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
