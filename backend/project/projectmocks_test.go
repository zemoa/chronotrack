package project

import "github.com/stretchr/testify/mock"

type ProjectStorageMock struct {
	mock.Mock
}

func (m *ProjectStorageMock) Create(label string) ProjectData {
	args := m.Called(label)
	return args.Get(0).(ProjectData)
}

func (m *ProjectStorageMock) Get(projectId uint) (*ProjectData, error) {
	args := m.Called(projectId)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*ProjectData), args.Error(1)
}

func (m *ProjectStorageMock) Delete(id uint) {
	m.Called(id)
}

type TaskStorageMock struct {
	mock.Mock
}

func (m *TaskStorageMock) Create(projectId uint, label string) TaskData {
	args := m.Called(projectId, label)
	return args.Get(0).(TaskData)
}
