import { Injectable } from "@angular/core";
import { Task } from "../business/tasks.model";

@Injectable()
export class TasksService {
    async fetchAll(): Promise<Task[]> {
        return []
    }
}