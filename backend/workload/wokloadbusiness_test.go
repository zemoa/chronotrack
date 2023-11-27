package workload

import (
	"testing"
	"time"

	"github.com/stretchr/testify/suite"
)

type FunctionalWorkloadSuite struct {
	suite.Suite
	exisitngTaskId uint
}

func (funcSuite *FunctionalWorkloadSuite) SetupTest() {
	funcSuite.exisitngTaskId = uint(12)
}

func TestFunctionalWorkloadSuite(t *testing.T) {
	suite.Run(t, new(FunctionalWorkloadSuite))
}

func (funcSuite *FunctionalWorkloadSuite) TestGiven_ExistingTask_when_CallingStart_then_ItShouldCreateANewWorkload() {
	sut := NewWorkloadService()
	workload := sut.Start(12, time.Date(2023, 11, 21, 15, 0, 0, 0, time.UTC))

	funcSuite.Equal(time.Date(2023, 11, 21, 15, 0, 0, 0, time.UTC), workload.start)
	funcSuite.Nil(workload.end)
}
