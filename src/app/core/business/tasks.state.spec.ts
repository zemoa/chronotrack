import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { MockBuilder, MockInstance, MockProvider, getMockedNgDefOf, ngMocks } from "ng-mocks";
import { delay, firstValueFrom, of } from "rxjs";
import { TasksService } from "../services/tasks.service";
import { Tasks } from "./tasks.action";
import { Task, TasksStateModel, WorkLoad } from "./tasks.model";
import { TasksState } from "./tasks.state";
import { DateService } from "../services/date.services";

const INITIALE_STATE: TasksStateModel = {
    loading: false,
    tasks: []
}

describe('Tasks', () => {
    MockInstance.scope()

    beforeEach(() => {
        return MockBuilder(NgxsModule.forRoot([TasksState]))
        .mock(TasksService, {
            startWorking: id => of([new WorkLoad(new Date(2023,7,2,15,0,0,0))]),
            select: id => of(new Task('Task 1', '1', true)),
            save: (name: string) => of(new Task(name, '1234')),
            fetchAll: () => of([new Task('Task 1', '1'), new Task('Task 2', '2')]).pipe(delay(200)),
            remove: () => of(true)
        })
        .mock(DateService, {
            now: () => new Date(2023,7,2,15,0,0,0)
        })
        .then(() => {
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


    it('Remove a task', async () => {
        console.log('Remove a task')
        const store = TestBed.inject(Store);
        store.reset({
            ...store.snapshot(),
            tasks: {
                loading: false,
                tasks: [new Task("Task 1", "1"), new Task("Task 2", "2")]
            } as TasksStateModel
        })

        await firstValueFrom(store.dispatch(new Tasks.Remove('1')));

        let tasksState: TasksStateModel = store.selectSnapshot(state => state.tasks);
        
        expect(tasksState.tasks.length).toEqual(1);
        const task = tasksState.tasks[0]
        expect(task.name).toEqual('Task 2')
        expect(task.id).toBe('2')
    });

    it('Select a task', async () => {
        console.log('Select a task')
        const store = TestBed.inject(Store);
        store.reset({
            ...store.snapshot(),
            tasks: {
                loading: false,
                tasks: [new Task("Task 1", "1"), new Task("Task 2", "2")]
            } as TasksStateModel
        })

        await firstValueFrom(store.dispatch(new Tasks.Select('1')));

        let tasksState: TasksStateModel = store.selectSnapshot(state => state.tasks);
        const selectedTaskList = tasksState.tasks.filter(task => task.selected);
        expect(selectedTaskList.length).toEqual(1)
        expect(selectedTaskList[0].id).toEqual("1")
        expect(selectedTaskList[0].name).toEqual("Task 1")
        expect(selectedTaskList[0].selected).toBe(true)
    })

    it('Start working on selected task', async () => {
        console.log('Start working on selected task')
        const store = TestBed.inject(Store);
        store.reset({
            ...store.snapshot(),
            tasks: {
                loading: false,
                tasks: [new Task("Task 1", "1", true), new Task("Task 2", "2")]
            } as TasksStateModel
        })

        await firstValueFrom(store.dispatch(new Tasks.StartWorking()));

        let tasksState: TasksStateModel = store.selectSnapshot(state => state.tasks);
        const selectedTaskList = tasksState.tasks.filter(task => task.selected)[0];
        expect(selectedTaskList.workLoads.length).toEqual(1)
        expect(selectedTaskList.workLoads[0].start).toEqual(new Date(2023,7,2,15,0,0,0))
    })
})