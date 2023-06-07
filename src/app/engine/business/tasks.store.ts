import { Action, State, StateContext, Store } from "@ngxs/store";
import { TaskStateModel } from "../api/tasks.statemodel";
import { Injectable } from "@angular/core";
import { AddTask, RemoveTask, StartWorkingOnTask, StopWorkingOnTask } from "../api/tasks.actions";
import { patch, removeItem, updateItem } from "@ngxs/store/operators";
import { TaskDto } from "../api/tasks.dto";
import { DateUtils } from "./utils/date.utils";

@State<TaskStateModel>({
    name: 'tasks',
    defaults: {
        taskList: []
    }
})
@Injectable()
export class TasksStore {
    constructor(private stroe:Store, private dateUtils: DateUtils){}

    @Action(AddTask)
    addTask(ctx: StateContext<TaskStateModel>, action: AddTask) {
        const state = ctx.getState();
        let newTaskIndex = 0;
        if(state.taskList.length > 0) {
            newTaskIndex = state.taskList[state.taskList.length - 1].id + 1;
        }
        ctx.patchState({
            taskList: [
                ...state.taskList,
                {
                    id:newTaskIndex,
                    label: action.label,
                    created: this.dateUtils.now()
                }
            ]
        });
    }

    @Action(RemoveTask)
    removeTask(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
        ctx.setState(
            patch<TaskStateModel>({
                taskList: removeItem<TaskDto>(task => task.id === action.id)
            })
        )
    }

    @Action(StartWorkingOnTask)
    startWorkingOnTask(ctx: StateContext<TaskStateModel>, action: StartWorkingOnTask) {
        ctx.setState(
            patch<TaskStateModel>({
                taskList: updateItem<TaskDto>(task => task.id === action.id,
                    patch({start: this.dateUtils.now()}))
            })
        )
    }

    @Action(StopWorkingOnTask)
    stopWorkingOnTask(ctx: StateContext<TaskStateModel>, action: StopWorkingOnTask) {
        ctx.setState(
            patch<TaskStateModel>({
                taskList: updateItem<TaskDto>(task => task.id === action.id,
                    patch({stop: this.dateUtils.now()}))
            })
        )
    }
}