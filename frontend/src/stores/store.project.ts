import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Project } from "./models/model.project";
import { Task } from "./models/model.task";

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref<Project[]>([])
    const tasks = ref<Task[]>([])
    const selectedProjectId = ref<number | undefined>()

    const projectTasks = computed(() => {
        if(selectedProjectId.value === undefined) return []
        return tasks.value.filter(task => task.projectId === selectedProjectId.value)
    })
    function addProject() {
        projects.value = [...projects.value, new Project(1, 'toto')]
    }

    function load() {
        projects.value = [
            new Project(0, 'Projet 1'),
            new Project(1, 'Projet 2')
        ]

        tasks.value = [
            new Task(0, 'Task 00', 0),
            new Task(1, 'Task 01', 0),
            new Task(2, 'Task 02', 0),
            new Task(3, 'Task 10', 1),
            new Task(4, 'Task 11', 1),
            new Task(5, 'Task 12', 1),
            new Task(6, 'Task 13', 1)
        ]
    }

    function selectProject(id?: number) {
        selectedProjectId.value = id
    }


    return {projects, projectTasks, selectedProjectId, tasks, selectProject, load, addProject}
})