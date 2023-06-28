import { Injectable } from "@angular/core";
import { Action, State, StateContext, createPropertySelectors } from "@ngxs/store";
import { Tasks } from "./tasks.action";
import { Task, TasksStateModel } from "./tasks.model";
import { TasksService } from "../services/tasks.service";
import { append, insertItem, patch } from "@ngxs/store/operators";

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
    async fetchAll(ctx: StateContext<TasksStateModel>) {
        ctx.patchState({
            loading: true
        })
        this.tasksService.fetchAll().subscribe(fetchedTasks => ctx.patchState({
            loading: false,
            tasks: fetchedTasks
        }))
    }  
    
    @Action(Tasks.Add)
    async addTask(ctx: StateContext<TasksStateModel>, action: Tasks.Add) {
        this.tasksService.save(action.name)
        .subscribe(newTask => ctx.setState(
            patch<TasksStateModel>({
                tasks: insertItem<Task>(newTask)
            })
        ))
    }
}


export class TasksSelectors {
    static slices = createPropertySelectors<TasksStateModel>(TasksState)
}