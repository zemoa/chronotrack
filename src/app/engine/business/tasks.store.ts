import { Action, State, StateContext, Store } from "@ngxs/store";
import { TaskStateModel } from "../api/tasks.statemodel";
import { Injectable } from "@angular/core";
import { AddTask, RemoveTask } from "../api/tasks.actions";
import { patch, removeItem } from "@ngxs/store/operators";
import { TaskDto } from "../api/tasks.dto";

@State<TaskStateModel>({
    name: 'tasks',
    defaults: {
        taskList: []
    }
})
@Injectable()
export class TasksStore {
    constructor(private stroe:Store){}

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
                    duiration: 0,
                    label: action.label,
                    start: new Date()
                }
            ]
        });
    }

    @Action(RemoveTask)
    removeTask(ctx: StateContext<TaskStateModel>, action: RemoveTask) {
        const state = ctx.getState();
        ctx.setState(
            patch<TaskStateModel>({
                taskList: removeItem<TaskDto>(task => task.id === action.id)
            })
        )
    }
}