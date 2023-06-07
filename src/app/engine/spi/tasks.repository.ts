import { Task } from "./tasks.entity";

export interface TaskRepository {
    save(tasks: Task): Task;
    update(task: Task): Task;
}
