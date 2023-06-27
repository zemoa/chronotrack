import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MockBuilder, MockInstance } from "ng-mocks";
import { TasksService } from "../services/tasks.service";
import { Tasks } from "./tasks.action";
import { Task, TasksStateModel } from "./tasks.model";
import { TasksState } from "./tasks.state";

describe('Tasks', () => {
    MockInstance.scope();

    beforeEach(() => {
        return MockBuilder()
            .keep(NgxsModule.forRoot([TasksState]))
            .mock(TasksService, {
                fetchAll: async () => await new Promise<Task[]>(resolve => setTimeout(() => resolve([new Task('Task 1'), new Task('Task 2')]), 200))
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
})