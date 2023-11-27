package workload

import "time"

type WorkloadDto struct {
	idTask uint
	start  time.Time
	end    time.Time
}

type IWorkloadService interface {
	Start(idTask uint, start time.Time) *WorkloadDto
}
