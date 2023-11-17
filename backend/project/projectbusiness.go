package project

type ProjectService struct {
	IProjectService
	projectStorage ProjectStorage
}

func (ps *ProjectService) Add(label string) ProjectDto {
	createProject := ps.projectStorage.Create(label)
	return ProjectDto{id: createProject.id, label: createProject.label}
}

func NewProjectService(projectStorage ProjectStorage) IProjectService {
	return &ProjectService{
		projectStorage: projectStorage,
	}
}
