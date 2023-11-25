package project

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

const GOOD_PROJECT_ID = uint(1)
const CREATED_TASK_ID = uint(123)

type TaskTestSuite struct {
	suite.Suite
	taskStorage    *TaskStorageMock
	projectStorage *ProjectStorageMock
	sut            ITasksService
}

func (tts *TaskTestSuite) SetupTest() {
	tts.taskStorage = new(TaskStorageMock)
	createCall := tts.taskStorage.On("Create", mock.AnythingOfType("uint"), mock.AnythingOfType("string"))
	createCall.Run(func(args mock.Arguments) {
		createCall.Return(TaskData{
			id:        CREATED_TASK_ID,
			projectId: GOOD_PROJECT_ID,
			label:     args.Get(1).(string),
		})
	})

	tts.projectStorage = new(ProjectStorageMock)
	tts.projectStorage.On("Get", mock.MatchedBy(func(projectId uint) bool {
		return projectId == GOOD_PROJECT_ID
	})).Return(&ProjectData{
		id:    GOOD_PROJECT_ID,
		label: "Good project",
	}, nil)
	tts.projectStorage.On("Get", mock.Anything).Return(nil, nil)
	tts.sut = NewTasksService(tts.taskStorage, tts.projectStorage)
}

func TestTasksSuite(t *testing.T) {
	suite.Run(t, new(TaskTestSuite))
}

func (tts *TaskTestSuite) TestCreateTaskWithExistingProject() {

	label := "Task test"
	taskDto, _ := tts.sut.Create(GOOD_PROJECT_ID, label)

	assert.Equal(tts.T(), CREATED_TASK_ID, taskDto.id)
	assert.Equal(tts.T(), label, taskDto.label)
	tts.taskStorage.AssertNumberOfCalls(tts.T(), "Create", 1)
}

func (tts *TaskTestSuite) TestCreateTaskWithNonExistingProjectMustFail() {
	label := "Task test"
	projectId := uint(2)

	_, error := tts.sut.Create(projectId, label)
	assert.NotNil(tts.T(), error)
}
