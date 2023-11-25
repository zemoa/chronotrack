package project

import (
	"fmt"
)

type ITasksService interface {
	Create(projectId uint, label string) (*TaskDto, error)
}

type TaskDto struct {
	id    uint
	label string
}

type TasksService struct {
	taskStorage    TaskStorage
	projectStorage ProjectStorage
}

func (ts *TasksService) Create(projectId uint, label string) (*TaskDto, error) {
	project, _ := ts.projectStorage.Get(projectId)
	if project == nil {
		return nil, fmt.Errorf("Can't find project %d", projectId)
	}
	task := ts.taskStorage.Create(projectId, label)
	return &TaskDto{
		id:    task.id,
		label: task.label,
	}, nil
}

func NewTasksService(taskStorage TaskStorage, projectStorage ProjectStorage) ITasksService {
	return &TasksService{taskStorage: taskStorage, projectStorage: projectStorage}
}
