package project

import "testing"

func TestCreateProject(t *testing.T) {
	label := "test"
	sut := ProjectService{}

	result := sut.Add(label)
	if result.id != 0 {
		t.Errorf("id : wanted 0 but got %d", result.id)
	}

	if result.label != label {
		t.Errorf("label : wanted %s but got %s", label, result.label)
	}
}
