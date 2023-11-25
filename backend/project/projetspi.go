package project

type ProjectData struct {
	id    uint
	label string
}

type ProjectStorage interface {
	Create(label string) ProjectData
	Get(id uint) (*ProjectData, error)
	Delete(id uint)
}

type TaskData struct {
	id        uint
	projectId uint
	label     string
}

type TaskStorage interface {
	Create(projectId uint, label string) TaskData
}
