import { Injectable } from "@angular/core";
import { Task } from "./tasks.entity";

export abstract class TaskRepository {
    abstract create(tasks: Task): Task;
    abstract update(task: Task): Task;
    abstract delete(id: number): void;
}