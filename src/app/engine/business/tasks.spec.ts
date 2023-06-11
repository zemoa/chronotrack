import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { TasksStore } from "./tasks.store";
import { AddTask, RemoveTask, StartWorkingOnTask, StopWorkingOnTask } from "../api/tasks.actions";
import { TaskStateModel } from "../api/tasks.statemodel";
import { DateUtils } from "./utils/date.utils";
import { mockNg } from 'ng-mockito';
import { mock, when, verify, anything, instance } from 'ts-mockito';
import { StopWorkingOnNotStartedTaskError } from "../api/tasks.dto";
import { TaskRepository } from "../spi/tasks.repository";
import { TasksUtils } from "./utils/tasks.utils";
import { Task } from "../spi/tasks.entity";
import { Injectable } from "@angular/core";

export const INIT_STATE : TaskStateModel = {
    taskList: [{
        id: 0,
        label: "Task 1",
        created: new Date('2023-06-07T19:00:01')
    }]
  };

describe('Tasks', () => {
    let store: Store;
    let mockedDateUtils: DateUtils;
    let taskRepository: TaskRepository;
    beforeEach(() => {
        mockedDateUtils = mock(DateUtils);
        taskRepository = mock<TaskRepository>();
        when(mockedDateUtils.now).thenReturn(() => new Date('2023-06-07T21:19:22'));
        when(taskRepository.create(anything())).thenCall((taskToSave: Task) => {
            return taskToSave;
        })
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TasksStore])],
            providers: [mockNg(mockedDateUtils), {provide : TaskRepository, useValue: instance(taskRepository)}, TasksUtils],
            teardown: {destroyAfterEach: false} 
        });
        
        store = TestBed.inject(Store);
        store.reset({
            ...store.snapshot(),
            tasks: INIT_STATE
          });
    })

    it('Add a task', () => {
        store.dispatch(new AddTask("A task 1"));
        when(mockedDateUtils.now).thenReturn(() => new Date('2023-06-07T21:23:34'));
        store.dispatch(new AddTask("A task 2"));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.lastError).toBe(undefined);
        expect(state.taskList.length).toBe(3);
        const task1 = state.taskList[1];
        expect(task1.label).toBe("A task 1");
        expect(task1.start).toBe(undefined);
        expect(task1.stop).toBe(undefined);
        expect(task1.id).toBe(1);
        expect(task1.created).toEqual(new Date('2023-06-07T21:19:22'));

        const task2 = state.taskList[2];
        expect(task2.label).toBe("A task 2");
        expect(task2.start).toBe(undefined);
        expect(task2.stop).toBe(undefined);
        expect(task2.id).toBe(2);
        expect(task2.created).toEqual(new Date('2023-06-07T21:23:34'));

        verify(taskRepository.create(anything())).twice();
    });

    it('Add a task and then remove it', () => {
        store.dispatch(new AddTask("A task"));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.lastError).toBe(undefined);
        expect(state.taskList.length).toBe(2);
        const task1 = state.taskList[1];
        expect(task1.label).toBe("A task");
        expect(task1.start).toBe(undefined);
        expect(task1.stop).toBe(undefined);
        expect(task1.id).toBe(1);

        store.dispatch(new RemoveTask(1));
        const state2 : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state2.lastError).toBe(undefined);
        expect(state2.taskList.length).toBe(1);
        const task0 = state.taskList[0];
        expect(task0.id).toBe(0);

        verify(taskRepository.create(anything())).once();
        verify(taskRepository.delete(anything())).once();
    });

    it('Start working on a task', () => {
        when(mockedDateUtils.now).thenReturn(() => new Date('2023-06-07T22:33:34'));
        store.dispatch(new StartWorkingOnTask(0));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.lastError).toBe(undefined);
        const selectedTask = state.taskList.filter(task => task.id === 0)[0];
        expect(selectedTask.start).toEqual(new Date('2023-06-07T22:33:34'));
        expect(selectedTask.stop).toBe(undefined);

        verify(taskRepository.update(anything())).once();
    });

    it('Stop working on a task', () => {
        store.dispatch(new StartWorkingOnTask(0));
        when(mockedDateUtils.now).thenReturn(() => new Date('2023-06-07T22:33:34'));
        store.dispatch(new StopWorkingOnTask(0));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.lastError).toBe(undefined);
        const selectedTask = state.taskList.filter(task => task.id === 0)[0];
        expect(selectedTask.start).toEqual(new Date('2023-06-07T21:19:22'));
        expect(selectedTask.stop).toEqual(new Date('2023-06-07T22:33:34'));

        verify(taskRepository.update(anything())).twice();
    });

    it('Start working on a task with no start should send error', () => {
        store.dispatch(new StopWorkingOnTask(0));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.lastError).toBeInstanceOf(StopWorkingOnNotStartedTaskError);
        const selectedTask = state.taskList.filter(task => task.id === 0)[0];
        expect(selectedTask.stop).toBe(undefined);

        verify(taskRepository.update(anything())).never();
        verify(taskRepository.create(anything())).never();
    });
});