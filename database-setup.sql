CREATE DATABASE todowork CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE todowork;

CREATE TABLE project (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_name VARCHAR(255),
    project_identifier VARCHAR(7) NOT NULL UNIQUE,
    description TEXT NULL,
    start_date DATE NULL,
    end_date DATE NULL,
    create_date DATE,
    update_date DATE,
    CONSTRAINT UC_ProjectIdentifier UNIQUE (project_identifier),
    INDEX idx_project_identifier (project_identifier)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE backlog (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    PTSequence INT DEFAULT 0,
    project_identifier VARCHAR(7) NOT NULL,
    project_id BIGINT NOT NULL,
    CONSTRAINT FK_Backlog_Project FOREIGN KEY (project_id) REFERENCES project(id),
    CONSTRAINT UC_BacklogIdentifier UNIQUE (project_identifier),
    INDEX idx_backlog_project_identifier (project_identifier),
    INDEX idx_backlog_project_id (project_id)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE project_task (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    project_sequence VARCHAR(255),
    summary TEXT NOT NULL,
    acceptance_criteria TEXT,
    status VARCHAR(255),
    priority INT,
    due_date DATE,
    created_date DATE,
    updated_date DATE,
    backlog_id BIGINT NOT NULL,
    project_identifier VARCHAR(7),
    CONSTRAINT FK_ProjectTask_Backlog FOREIGN KEY (backlog_id) REFERENCES backlog(id),
    CONSTRAINT UC_ProjectTaskSequence UNIQUE (project_sequence),
    INDEX idx_project_task_sequence (project_sequence),
    INDEX idx_project_task_backlog_id (backlog_id),
    INDEX idx_project_task_project_identifier (project_identifier),
    INDEX idx_project_task_priority (priority)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
