package project

type IProjectService interface {
	Add(label string) ProjectDto
	Delete(id uint)
}

type ProjectDto struct {
	id    uint
	label string
}

type ProjectService struct {
	projectStorage ProjectStorage
}

func NewProjectService(projectStorage ProjectStorage) IProjectService {
	return &ProjectService{
		projectStorage: projectStorage,
	}
}

func (ps *ProjectService) Add(label string) ProjectDto {
	createProject := ps.projectStorage.Create(label)
	return ProjectDto{id: createProject.id, label: createProject.label}
}

func (ps *ProjectService) Delete(id uint) {
	ps.projectStorage.Delete(id)
}
