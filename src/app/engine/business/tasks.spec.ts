import { TestBed } from "@angular/core/testing";
import { NgxsModule, Store } from "@ngxs/store";
import { TasksStore } from "./tasks.store";
import { AddTask, RemoveTask } from "../api/tasks.actions";
import { TaskStateModel } from "../api/tasks.statemodel";

export const INIT_STATE : TaskStateModel = {
    taskList: [{
        duiration: 123,
        id: 0,
        label: "Task 1",
        start: new Date()
    }]
  };

describe('Tasks', () => {
    let store: Store;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([TasksStore])]
        });
        store = TestBed.inject(Store);
    })

    it('Add a task', () => {
        store.dispatch(new AddTask("A task 1"));
        store.dispatch(new AddTask("A task 2"));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.taskList.length).toBe(2);
        const task1 = state.taskList[0];
        expect(task1.label).toBe("A task 1");
        expect(task1.duiration).toBe(0);
        expect(task1.id).toBe(0);

        const task2 = state.taskList[1];
        expect(task2.label).toBe("A task 2");
        expect(task2.duiration).toBe(0);
        expect(task2.id).toBe(1);
    });

    it('Add a task and then remove it', () => {
        store.dispatch(new AddTask("A task"));
    
        const state : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state.taskList.length).toBe(1);
        const task1 = state.taskList[0];
        expect(task1.label).toBe("A task");
        expect(task1.duiration).toBe(0);
        expect(task1.id).toBe(0);

        store.dispatch(new RemoveTask(0));
        const state2 : TaskStateModel = store.selectSnapshot(state => state.tasks);
        expect(state2.taskList.length).toBe(0);
    });
});