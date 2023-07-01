import { Injectable } from "@angular/core";
import { Task, WorkLoad } from "../business/tasks.model";
import { Observable, of, single } from "rxjs";

@Injectable()
export class TasksService {
    fetchAll(): Observable<Task[]> {
        return of([])
    }

    save(name: string): Observable<Task> {
        console.log('tototot')
        return of(new Task(name, '1'))
    }

    remove(id: string): Observable<boolean> {
        return of(true)
    }

    select(id: string): Observable<Task> {
        return of(new Task("Task 1", "1", true))
    }

    startWorking(id: string): Observable<WorkLoad[]> {
        return of([])
    }
}