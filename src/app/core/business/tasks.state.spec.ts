import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MockBuilder, MockInstance, MockProvider } from "ng-mocks";
import { delay, firstValueFrom, of } from "rxjs";
import { TasksService } from "../services/tasks.service";
import { Tasks } from "./tasks.action";
import { Task, TasksStateModel } from "./tasks.model";
import { TasksState } from "./tasks.state";

const INITIALE_STATE: TasksStateModel = {
    loading: false,
    tasks: []
}

describe('Tasks', () => {
    MockInstance.scope()

    beforeEach(() => {
        return MockBuilder(NgxsModule.forRoot([TasksState]))
        .mock(TasksService, {
            save: (name: string) => of(new Task(name, '1234')),
            fetchAll: () => of([new Task('Task 1', '1'), new Task('Task 2', '2')]).pipe(delay(200))
        }).then(() => {
            const store = TestBed.inject(Store);
            store.reset({
                ...store.snapshot(),
                tasks: INITIALE_STATE
            })
        })        
    });

    it('Fetch all tasks', async () => {
        console.log('Fetch all tasks')
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
        console.log('Add a task')
        const store = TestBed.inject(Store);
        await firstValueFrom(store.dispatch(new Tasks.Add('A new task')));

        let tasksState: TasksStateModel = store.selectSnapshot(state => state.tasks);
        expect(tasksState.tasks.length).toEqual(1);
        const task = tasksState.tasks[0]
        expect(task.name).toEqual('A new task')
        expect(task.id).toBe('1234')
    });
})