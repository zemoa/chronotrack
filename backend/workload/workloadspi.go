package workload

import "time"

type WorkloadData struct {
	id     uint
	idTask uint
	start  time.Time
	end    time.Time
}
type WorkloadStorage interface {
	Create(idTask uint, start time.Time) WorkloadData
}
