package project

import (
	"fmt"
)

type ITasksService interface {
	Create(projectId uint, label string) (*TaskDto, error)
	Find(query string) []TaskDto
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

func (ts *TasksService) Find(query string) []TaskDto {
	foundTasks := ts.taskStorage.Find(query)
	var result []TaskDto
	for _, task := range foundTasks {
		result = append(result, TaskDto{
			id:    task.id,
			label: task.label,
		})
	}
	return result
}

func NewTasksService(taskStorage TaskStorage, projectStorage ProjectStorage) ITasksService {
	return &TasksService{taskStorage: taskStorage, projectStorage: projectStorage}
}
