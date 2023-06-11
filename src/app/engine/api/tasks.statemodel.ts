import { TaskDto, TaskErrorDto } from "./tasks.dto";

export interface TaskStateModel {
    lastError?: TaskErrorDto;
    taskList: TaskDto[];
    loadingTasks: boolean;
}