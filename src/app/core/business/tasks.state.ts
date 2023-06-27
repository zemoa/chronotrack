import { Injectable } from "@angular/core";
import { Action, State, StateContext, createPropertySelectors } from "@ngxs/store";
import { Tasks } from "./tasks.action";
import { TasksStateModel } from "./tasks.model";
import { TasksService } from "../services/tasks.service";

@State<TasksStateModel>({
    name: 'tasks',
    defaults: {
        tasks: [],
        loading: false
    }
})
@Injectable()
export class TasksState {
    constructor(private tasksService: TasksService){}

    @Action(Tasks.FetchAll)
    fetchAll(ctx: StateContext<TasksStateModel>) {
        ctx.patchState({
            loading: true
        })
        const fetchedTasks = this.tasksService.fetchAll()
        ctx.patchState({
            loading: false,
            tasks: fetchedTasks
        })
    }    
}


export class TasksSelectors {
    static slices = createPropertySelectors<TasksStateModel>(TasksState)
}