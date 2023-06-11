import { Action, State, StateContext, Store } from "@ngxs/store";
import { TaskStateModel } from "../api/tasks.statemodel";
import { Injectable } from "@angular/core";
import { AddTask, LoadExistingTasks, RemoveTask, StartWorkingOnTask, StopWorkingOnTask } from "../api/tasks.actions";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { StopWorkingOnNotStartedTaskError, TaskDto } from "../api/tasks.dto";
import { DateUtils } from "./utils/date.utils";
import { TaskRepository } from "../spi/tasks.repository";
import { Task } from "../spi/tasks.entity";
import { TasksUtils } from "./utils/tasks.utils";

@State<TaskStateModel>({
    name: 'tasks',
    defaults: {
        loadingTasks: false,
        taskList: []
    }
})
@Injectable()
export class TasksStore {
    constructor(private store: Store, private dateUtils: DateUtils, private tasksUtils: TasksUtils, private taskRepository: TaskRepository) { }

    @Action(AddTask)
    addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
        const state = ctx.getState();
        let newTaskIndex = 0;
        if (state.taskList.length > 0) {
            newTaskIndex = state.taskList[state.taskList.length - 1].id + 1;
        }

        const taskToSave: Task = {
            id: newTaskIndex,
            label: action.label,
            created: this.dateUtils.now()
        };
        this.taskRepository.create(taskToSave);
        ctx.patchState({
            taskList: [
                ...state.taskList,
                this.tasksUtils.mapToDto(taskToSave)
            ]
        });
    }

    @Action(RemoveTask)
    removeTask(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
        this.taskRepository.delete(action.id);
        ctx.setState(
            patch<TaskStateModel>({
                taskList: removeItem<TaskDto>(task => task.id === action.id)
            })
        )
    }

    @Action(StartWorkingOnTask)
    startWorkingOnTask(ctx: StateContext<TaskStateModel>, action: StartWorkingOnTask) {
        const task = this.findTask(ctx, action.id);
        if (task) {
            task.start = this.dateUtils.now();
            this.taskRepository.update(task);
            ctx.setState(
                patch<TaskStateModel>({
                    taskList: updateItem<TaskDto>(task => task.id === action.id,
                        patch(task))
                })
            )
        }

    }

    @Action(StopWorkingOnTask)
    stopWorkingOnTask(ctx: StateContext<TaskStateModel>, action: StopWorkingOnTask) {
        const task = this.findTask(ctx, action.id);
        if (task) {
            if (task.start) {
                task.stop = this.dateUtils.now();
                this.taskRepository.update(task);
                ctx.setState(
                    patch<TaskStateModel>({
                        taskList: updateItem<TaskDto>(task => task.id === action.id,
                            patch(task))
                    })
                )
            } else {
                ctx.setState(patch({ lastError: new StopWorkingOnNotStartedTaskError("") }))
            }
        }
    }

    @Action(LoadExistingTasks)
    async loadExistingTasks(ctx: StateContext<TaskStateModel>) {
        ctx.setState(
            patch<TaskStateModel>({
                loadingTasks: true
            })
        );
        const tasksList = await this.taskRepository.loadAll();
        ctx.setState(
            patch<TaskStateModel>({
                loadingTasks: false,
                taskList: tasksList
            })
        );
    }

    private findTask(ctx: StateContext<TaskStateModel>, id: number): TaskDto | undefined {
        const state = ctx.getState();
        return state.taskList.find(task => task.id === id);
    }
}