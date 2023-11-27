package workload

import "time"

type WorkloadService struct{}

func (ws *WorkloadService) Start(idTask uint, start time.Time) *WorkloadDto {
	return nil
}

func NewWorkloadService() IWorkloadService {
	return &WorkloadService{}
}
