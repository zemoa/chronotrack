package project

type ProjectData struct {
	id    uint
	label string
}

type ProjectStorage interface {
	Create(label string) ProjectData
}
