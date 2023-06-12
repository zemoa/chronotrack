import { Injectable } from "@angular/core";
import { Task } from "./tasks.entity";
import { delay } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TaskRepository {
    create(tasks: Task): Task {
        throw new Error("Not implemented yet!");
    }
    update(task: Task): Task{
        throw new Error("Not implemented yet!");
    }
    delete(id: number): void{
        throw new Error("Not implemented yet!");
    }
    async loadAll(): Promise<Task[]>{
        console.debug("Start loading tasks");
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.debug("End loading tasks");
        return [{
            created: new Date(),
            id: 0,
            label: "First task"
        }];
    }
}