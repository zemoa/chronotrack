import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { Task } from "./models/model.task";
import { Workload } from "./models/model.workload";

export const useWorkloadStore = defineStore('workload', () => {
    const selectedDate = ref<Date | undefined>()
    const workloadsDay = computed(() => {
        if (!selectedDate.value) return []
        const aDate = new Date(selectedDate.value)
        return [
            new Workload(new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(), 0, 0, 0), 500, false, 0),
            new Workload(new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(), 10, 0, 0), 1 * 3600, false, 0),
            new Workload(new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(), 13, 0, 0), 2 * 3600, false, 0),
            new Workload(new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate(), 20, 0, 0), 500, true, 0),
        ]
    })

    const workingTask = computed(() => workloadsDay.value.find(workload => workload.running))
    const allExceptWorking = computed(() => workloadsDay.value.filter(workload => !workload.running))
    const tasks = [
        new Task(0, 'Task 00', 0),
        new Task(1, 'Task 01', 0),
        new Task(2, 'Task 02', 0),
        new Task(3, 'Task 10', 1),
        new Task(4, 'Task 11', 1),
        new Task(5, 'Task 12', 1),
        new Task(6, 'Task 13', 1)
    ]
    function searchTask(query: string): Task[] {
        return query
        ? tasks.filter(filter(query))
        : tasks
    }

    function filter(query: string) {
        return (task: Task) => {
            return (
                task.name.toLowerCase().indexOf(query.toLowerCase()) === 0
            )
        }
    }

    function workOnTask(name: string, id: number | undefined): void {
        if(id === undefined) {
            console.log(`Working on new task ${name}`)
        } else {
            console.log(`Working on existing task ${tasks.find(task => task.id === id)?.name}`)
        }
    }

    return {selectedDate, workingTask, allExceptWorking, searchTask, workOnTask}
})