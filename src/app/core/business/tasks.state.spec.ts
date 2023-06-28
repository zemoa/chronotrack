import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MockBuilder, MockInstance } from "ng-mocks";
import { TasksService } from "../services/tasks.service";
import { Tasks } from "./tasks.action";
import { Task, TasksStateModel } from "./tasks.model";
import { TasksState } from "./tasks.state";
import * as exp from "constants";
import { firstValueFrom } from "rxjs";

describe('Tasks', () => {
    MockInstance.scope();

    beforeEach(() => {
        return MockBuilder()
            .keep(NgxsModule.forRoot([TasksState]))
            .mock(TasksService, {
                fetchAll: async () => await new Promise<Task[]>(resolve => setTimeout(() => resolve([new Task('Task 1', '1'), new Task('Task 2', '2')]), 200)),
                save: async (name: string) => await new Promise<Task>(resolve => resolve(new Task(name, '1234')))
            })
    });

    it('Fetch all tasks', async () => {
        const store = TestBed.inject(Store);
        store.dispatch(new Tasks.FetchAll());

        let tasksState: TasksStateModel = store.selectSnapshot(state => state.tasks);
        expect(tasksState.loading).toBe(true);
        await new Promise(resolve => setTimeout(() => {
            resolve('')
        }, 250))
        tasksState = store.selectSnapshot(state => state.tasks);
        expect(tasksState.loading).toBe(false);
        expect(tasksState.tasks.length).toEqual(2);
    });

    it('Add a task', async () => {
        const store = TestBed.inject(Store);
        const tasksService = TestBed.inject(TasksService)
        spyOn(tasksService, 'save')
        await firstValueFrom(store.dispatch(new Tasks.Add('A new task')));

        let tasksState: TasksStateModel = store.selectSnapshot(state => state.tasks);
        expect(tasksService.save).toHaveBeenCalledTimes(1);
        expect(tasksState.tasks.length).toEqual(1);
        const task = tasksState.tasks[0]
        expect(task.name).toEqual('A new task')
        expect(task.id).toBe('1234')
    });
})