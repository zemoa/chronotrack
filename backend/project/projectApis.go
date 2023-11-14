package project

type IProjectService interface {
	Add(label string) ProjectDto
}

type ProjectDto struct {
	id    uint
	label string
}
