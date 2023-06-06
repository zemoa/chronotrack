import { Action, State, StateContext, Store } from "@ngxs/store";
import { TaskStateModel } from "../api/tasks.statemodel";
import { Injectable } from "@angular/core";
import { AddTask } from "../api/tasks.actions";

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
        ctx.patchState({
            taskList: [
                ...state.taskList,
                {
                    duiration: 0,
                    label: action.label,
                    start: new Date()
                }
            ]
        });
    }
}