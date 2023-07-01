import { Injectable } from "@angular/core";
import { Action, State, StateContext, createPropertySelectors } from "@ngxs/store";
import { Tasks } from "./tasks.action";
import { Task, TasksStateModel } from "./tasks.model";
import { TasksService } from "../services/tasks.service";
import { append, insertItem, patch, removeItem, updateItem } from "@ngxs/store/operators";

@State<TasksStateModel>({
    name: 'tasks',
    defaults: {
        tasks: [],
        loading: false
    }
})
@Injectable()
export class TasksState {
    constructor(private tasksService: TasksService) { }

    @Action(Tasks.FetchAll)
    fetchAll(ctx: StateContext<TasksStateModel>) {
        ctx.patchState({
            loading: true
        })
        this.tasksService.fetchAll().subscribe(fetchedTasks => ctx.patchState({
            loading: false,
            tasks: fetchedTasks
        }))
    }

    @Action(Tasks.Add)
    addTask(ctx: StateContext<TasksStateModel>, action: Tasks.Add) {
        this.tasksService.save(action.name)
            .subscribe(newTask => ctx.setState(
                patch<TasksStateModel>({
                    tasks: insertItem<Task>(newTask)
                })
            ))
    }

    @Action(Tasks.Remove)
    removeTask(ctx: StateContext<TasksStateModel>, action: Tasks.Remove) {
        this.tasksService.remove(action.id)
            .subscribe(() => ctx.setState(
                patch<TasksStateModel>({
                    tasks: removeItem(task => task.id === action.id)
                })
            ))
    }

    @Action(Tasks.Select)
    selectTask(ctx: StateContext<TasksStateModel>, action: Tasks.Select) {
        this.tasksService.select(action.id)
            .subscribe(taskResponse => ctx.setState(
                patch<TasksStateModel>({
                    tasks: updateItem(task => task.id === taskResponse.id, patch({
                        selected: true
                    }))
                })
            ))
    }

    @Action(Tasks.StartWorking)
    startWorking(ctx: StateContext<TasksStateModel>, action: Tasks.StartWorking) {
        const selectedTask = ctx.getState().tasks.find(task => task.selected) 
        if(selectedTask) {
            this.tasksService.startWorking(selectedTask.id)
            .subscribe(workload => ctx.setState(
                patch<TasksStateModel>({
                    tasks: updateItem(task => task.id === selectedTask.id, patch({
                        workLoads: workload
                    }))
                })
            ))
        }
        
    }
}


export class TasksSelectors {
    static slices = createPropertySelectors<TasksStateModel>(TasksState)
}