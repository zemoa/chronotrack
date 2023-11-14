package project

type ProjectService struct {
	IProjectService
}

func (ps *ProjectService) Add(label string) ProjectDto {
	return ProjectDto{id: 0, label: label}
}
