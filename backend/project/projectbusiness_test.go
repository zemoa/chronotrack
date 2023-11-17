package project

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type ProjectStorageMock struct {
	mock.Mock
	ProjectStorage
}

func (m *ProjectStorageMock) Create(label string) ProjectData {
	args := m.Called(label)
	return args.Get(0).(ProjectData)
}

func TestCreateProject(t *testing.T) {
	projectStorageMock := new(ProjectStorageMock)

	label := "test"
	projectStorageMock.On("Create", label).Return(ProjectData{id: 0, label: label})
	sut := NewProjectService(projectStorageMock)

	result := sut.Add(label)
	assert.Equal(t, uint(0), result.id)
	assert.Equal(t, label, result.label)
	projectStorageMock.AssertNumberOfCalls(t, "Create", 1)
}
