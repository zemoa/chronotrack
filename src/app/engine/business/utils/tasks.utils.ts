import { Injectable } from "@angular/core";
import { TaskDto } from "../../api/tasks.dto";
import { Task } from "../../spi/tasks.entity";

@Injectable({
    providedIn: 'root'
})
export class TasksUtils {
    mapToDto(task: Task): TaskDto {
        return {
            created: task.created,
            id: task.id,
            label: task.label,
            start: task.start
        }
    }
}