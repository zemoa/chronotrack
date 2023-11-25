package project

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

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

func TestDeleteProject(t *testing.T) {
	projectStorageMock := new(ProjectStorageMock)
	projectStorageMock.On("Delete", uint(0)).Return()
	sut := NewProjectService(projectStorageMock)
	sut.Delete(0)
	projectStorageMock.AssertNumberOfCalls(t, "Delete", 1)
}
